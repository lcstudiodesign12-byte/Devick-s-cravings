import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, Plus, Minus, X, 
  Check, Copy, MessageSquare, Flame, ChevronLeft, ArrowRight, ChefHat, Star, Phone, Bike, Heart, Leaf, CookingPot
} from 'lucide-react';

const WHATSAPP_NUMBER = "2349014856163";
const BANK_DETAILS = [
  { bankName: "FCMB", accountNumber: "1036053946", accountName: "Victoria Ori Sunday" },
  { bankName: "OPay", accountNumber: "9014856163", accountName: "Victoria Ori Sunday" }
];

const DEFAULT_FALLBACK_IMAGE = "/fried-rice-beef.jpeg";

const MAIN_CATEGORIES = [
  {
    id: "cat-noodles",
    name: "Stir-Fry Noodles",
    category: "Noodles",
    coverImage: "/noodles-1egg.jpeg",
    description: "Indomie spiced perfection, customized just for you.",
    items: [
      { id: "n1", name: "Noodles with 1 Egg", price: 1500, image: "/noodles-1egg.jpeg", description: "Vegetable garnish, egg, spice kick." },
      { id: "n2", name: "Noodles with 2 Eggs", price: 2000, image: "/noodles-2eggs.jpeg", description: "Double the protein, maximum flavor." },
      { id: "n3", name: "Noodles, 2 Eggs & Sausage", price: 3000, image: "/noodles-egg-sausage.jpeg", description: "Rich, loaded Indomie platter." },
      { id: "n4", name: "Noodles, 2 Eggs & Chicken", price: 4000, image: "/noodles-egg-chicken.jpeg", description: "Spicy noodles and golden-fried chicken." }
    ]
  },
  {
    id: "cat-spaghetti",
    name: "Classic Jollof Spaghetti",
    category: "Spaghetti",
    coverImage: "/spaghetti-chicken.jpeg",
    description: "Nigerian spaghetti cooked in rich tomato-pepper stew.",
    items: [
      { id: "s1", name: "Spaghetti & 2 Sausages", price: 2000, image: "/spaghetti-sausages.jpeg", description: "Stewed spaghetti & sliced sausages." },
      { id: "s2", name: "Spaghetti & 2 Eggs", price: 2000, image: "/spaghetti-eggs.jpeg", description: "Perfect balance, stewed perfection." },
      { id: "s3", name: "Spaghetti & Chicken", price: 3500, image: "/spaghetti-chicken.jpeg", description: "Rich pepper sauce spaghetti & juicy chicken." },
      { id: "s4", name: "Spaghetti & Beef", price: 3000, image: "/spaghetti-beef.jpeg", description: "Tender beef in stewed spaghetti." },
      { id: "s5", name: "Spaghetti & Goat Meat", price: 4000, image: "/spaghetti-goatmeat.jpeg", description: "Savory goat meat & seasoned spaghetti." }
    ]
  },
  {
    id: "cat-jollof",
    name: "Smoky Party Jollof",
    category: "Jollof Rice",
    coverImage: "/jollof-chicken.jpeg",
    description: "Deeply flavorful, smoked party-style Jollof.",
    items: [
      { id: "j1", name: "Jollof Rice & 2 Sausages", price: 2000, image: "/jollof-sausages.jpeg", description: "Classic party smoky Jollof." },
      { id: "j2", name: "Jollof Rice & 2 Eggs", price: 2000, image: "/jollof-eggs.jpeg", description: "Smoky Jollof rice, perfectly cooked eggs." },
      { id: "j3", name: "Jollof Rice & Chicken", price: 3500, image: "/jollof-chicken.jpeg", description: "Authentic party vibe, fried chicken." },
      { id: "j4", name: "Jollof Rice & Beef", price: 3000, image: "/jollof-beef.jpeg", description: "Smoky party rice and tender beef." },
      { id: "j5", name: "Jollof Rice & Goat Meat", price: 4000, image: "/jollof-goatmeat.jpeg", description: "Smoky Jollof, spicy seasoned goat meat." }
    ]
  },
  {
    id: "cat-fried-rice",
    name: "Fried Rice",
    category: "Fried Rice",
    coverImage: "/fried-rice-beef.jpeg",
    description: "Loaded with fresh vegetables and classic flavor.",
    items: [
      { id: "f1", name: "Fried Rice & 2 Sausages", price: 2000, image: "/fried-rice-sausage.jpeg", description: "Classic fried rice loaded with mix veggies." },
      { id: "f2", name: "Fried Rice & 2 Eggs", price: 2000, image: "/fried-rice-eggs.jpeg", description: "Fried rice served with eggs." },
      { id: "f3", name: "Fried Rice & Chicken", price: 3500, image: "/fried-rice-beef.jpeg", description: "Classic fried rice with fried chicken." },
      { id: "f4", name: "Fried Rice & Beef", price: 3000, image: "/fried-rice-beef.jpeg", description: "Fried rice and seasoned beef." },
      { id: "f5", name: "Fried Rice & Goat Meat", price: 4000, image: "/fried-rice-goatmeat.jpeg", description: "Fried rice and spicy goat meat." }
    ]
  },
  {
    id: "cat-white-rice",
    name: "Rice & Stew Platter",
    category: "White Rice",
    coverImage: "/white-rice-stew-beef.jpeg",
    description: "Freshly steamed rice with pepper stew or vegetable sauce.",
    items: [
      { id: "wr1", name: "White Rice, Stew & 2 Eggs", price: 3000, image: "/white-rice-stew-eggs.jpeg", description: "White rice, pepper stew, and eggs." },
      { id: "wr2", name: "White Rice, Stew & Chicken", price: 4000, image: "/white-rice-stew-chic.jpeg", description: "White rice, pepper stew, and chicken." },
      { id: "wr3", name: "White Rice, Stew & Beef", price: 3500, image: "/white-rice-stew-beef.jpeg", description: "White rice, pepper stew, and beef." },
      { id: "wr4", name: "White Rice, Stew & Goat Meat", price: 4500, image: "/white-rice-stew-go.jpeg", description: "White rice, pepper stew, and goat meat." },
      { id: "wr5", name: "White Rice, Veg Sauce & 2 Eggs", price: 4500, image: "/white-rice-veg-eggs.jpeg", description: "White rice, rich vegetable sauce, and eggs." },
      { id: "wr6", name: "White Rice, Veg Sauce & Beef", price: 5500, image: "/white-rice-veg-beef.jpeg", description: "White rice, veg sauce, and beef." },
      { id: "wr7", name: "White Rice, Veg Sauce & Chicken", price: 6000, image: "/white-rice-veg-chic.jpeg", description: "White rice, veg sauce, and chicken." },
      { id: "wr8", name: "White Rice, Veg Sauce & Goat Meat", price: 6500, image: "/white-rice-veg-egg.jpeg", description: "White rice, veg sauce, and goat meat." }
    ]
  },
  {
    id: "cat-yam",
    name: "Yam & Sauce Combo",
    category: "Yam & Sauce",
    coverImage: "/yam-egg-sauce.jpeg",
    description: "Soft boiled yam chunks with choice of rich sauce.",
    items: [
      { id: "y1", name: "Yam & Sauce Only", price: 2000, image: "/yam-sauce-only.jpeg", description: "Boiled yam chunks with pepper sauce." },
      { id: "y2", name: "Yam & Egg Sauce", price: 3000, image: "/yam-egg-sauce.jpeg", description: "Boiled yam served with rich tomato egg sauce." },
      { id: "y3", name: "Boiled Yam & Vegetable Sauce", price: 4000, image: "/yam-veg-sauce.jpeg", description: "Boiled yam served with rich veg sauce." }
    ]
  },
  {
    id: "cat-chips",
    name: "Crispy Irish Chips",
    category: "Chips",
    coverImage: "/chips-chicken.jpeg",
    description: "Golden fried potato chips, served hot.",
    items: [
      { id: "c1", name: "Irish Chips & Egg", price: 3500, image: "/chips-egg.jpeg", description: "Golden chips and fluffy egg omelette." },
      { id: "c2", name: "Irish Chips & Chicken", price: 4500, image: "/chips-chicken.jpeg", description: "Golden chips and fried chicken." },
      { id: "c3", name: "Irish Chips, Chicken & Sausage", price: 5500, image: "/chips-chicken.jpeg", description: "Loaded chips platter, chicken, sausages." }
    ]
  },
  {
    id: "cat-peppered-meat",
    name: "Smoked Peppered Meat",
    category: "Peppered Meat",
    coverImage: "/pepper-goatmeat.jpeg",
    description: "Tender, spicy smoked meats in fiery pepper sauce.",
    items: [
      { id: "pm1", name: "Pepper Beef", price: 4000, image: "/pepper-beef.jpeg", description: "Spicy smoked beef, pepper sauce toss." },
      { id: "pm2", name: "Pepper Chicken", price: 4500, image: "/pepper-chicken.jpeg", description: "Fried chicken tossed in fiery pepper sauce." },
      { id: "pm3", name: "Pepper Goat Meat (Asun)", price: 5000, image: "/pepper-goatmeat.jpeg", description: "Smoked goat, fiery pepper, authentic flavor." }
    ]
  }
];

const styles = {
  splashContainer: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#FDFBF7',
    backgroundImage: 'radial-gradient(circle at center, #FFFDF9 0%, #EFE8D8 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
    textAlign: 'center'
  },
  splashLogoCircle: {
    position: 'relative',
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    backgroundColor: '#0A3A25',
    border: '3px solid #E5A900',
    overflow: 'hidden',
    boxShadow: '0 0 35px rgba(229, 169, 0, 0.4)',
    marginBottom: '20px'
  },
  appBackground: {
    backgroundColor: '#FDFBF7',
    backgroundImage: 'radial-gradient(circle at top, #FFFDF9 0%, #F5F0E1 100%)',
    color: '#1A1A1A',
    minHeight: '100vh',
    fontFamily: "system-ui, -apple-system, sans-serif",
    paddingBottom: '30px'
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: '#0A3A25',
    borderBottom: '3px solid #E5A900',
    padding: '12px 16px',
    boxShadow: '0 4px 20px rgba(10, 58, 37, 0.3)'
  },
  logoContainer: {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    border: '2px solid #E5A900',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 8px rgba(229, 169, 0, 0.5)'
  },
  tagline: {
    fontSize: '10px',
    color: '#E5A900',
    fontWeight: '700',
    margin: '2px 0 0 0',
    letterSpacing: '0.5px'
  },
  heroBanner: {
    position: 'relative',
    borderRadius: '16px',
    overflow: 'hidden',
    marginTop: '14px',
    border: '2px solid #0A3A25',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
    height: '220px',
    backgroundColor: '#FFFFFF'
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center'
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(10,58,37,0.92) 20%, rgba(10,58,37,0.2) 65%, transparent 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '14px'
  },
  deliveryCard: {
    borderRadius: '16px',
    overflow: 'hidden',
    border: '2px solid #E5A900',
    boxShadow: '0 6px 18px rgba(10,58,37,0.12)',
    marginBottom: '16px',
    backgroundColor: '#0A3A25', // Clean dark background to frame the full image nicely
    position: 'relative'
  },
  pillsContainer: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '8px',
    marginTop: '14px',
    scrollbarWidth: 'none'
  },
  pillActive: {
    backgroundColor: '#0A3A25',
    color: '#FFF8E7',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '900',
    whiteSpace: 'nowrap',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(10, 58, 37, 0.3)'
  },
  pillInactive: {
    backgroundColor: '#FFFFFF',
    color: '#0A3A25',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
    border: '1px solid #D5CBB3',
    cursor: 'pointer'
  },
  searchInput: {
    width: '100%',
    padding: '11px 36px 11px 38px',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #D5CBB3',
    borderRadius: '12px',
    color: '#1A1A1A',
    fontSize: '12px',
    fontWeight: '600',
    outline: 'none',
    boxSizing: 'border-box'
  },
  foodCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #E6DFC5',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  foodImage: {
    width: '100%',
    height: '110px',
    objectFit: 'cover',
    borderRadius: '12px',
    backgroundColor: '#F0EAD6'
  },
  addBtn: {
    backgroundColor: '#0A3A25',
    color: '#FFF8E7',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '900',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '3px'
  },
  catCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid #E6DFC5',
    borderRadius: '16px',
    padding: '10px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  catItemImg: {
    width: '64px',
    height: '64px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '2px solid #E5A900',
    backgroundColor: '#F0EAD6'
  },
  floatingCart: {
    position: 'fixed',
    right: '18px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 150
  },
  cartCircle: {
    width: '58px',
    height: '58px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0A3A25 0%, #051F13 100%)',
    border: '2.5px solid #E5A900',
    boxShadow: '0 8px 24px rgba(10, 58, 37, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative'
  },
  cartBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: '#D32F2F',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: '900',
    minWidth: '22px',
    height: '22px',
    borderRadius: '11px',
    padding: '0 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #FFF'
  }
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeCategoryView, setActiveCategoryView] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [copiedBankIndex, setCopiedBankIndex] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const allFlattenedItems = useMemo(() => {
    let list = [];
    MAIN_CATEGORIES.forEach(cat => {
      cat.items.forEach(item => {
        list.push({ ...item, categoryName: cat.name, catId: cat.id });
      });
    });
    return list;
  }, []);

  const filteredItemsByPill = useMemo(() => {
    if (selectedCategory === "All") return null;
    const cat = MAIN_CATEGORIES.find(c => c.category === selectedCategory || c.name === selectedCategory);
    return cat ? cat.items : [];
  }, [selectedCategory]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allFlattenedItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, allFlattenedItems]);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(c => c.id === item.id);
      if (existing) {
        return prevCart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const cartTotal = useMemo(() => cart.reduce((tot, i) => tot + (i.price * i.quantity), 0), [cart]);
  const totalCartCount = useMemo(() => cart.reduce((tot, i) => tot + i.quantity, 0), [cart]);

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    if (!customerName.trim() || !deliveryAddress.trim()) {
      alert("Please enter your Full Name and Delivery Address.");
      return;
    }

    let message = `*NEW ORDER - DEVICK'S CRAVINGS*\n`;
    message += `-----------------------------------\n`;
    message += `*Customer:* ${customerName}\n`;
    message += `*Address:* ${deliveryAddress}\n`;
    message += `*Payment Method:* Bank Transfer (Pre-paid)\n`;
    message += `-----------------------------------\n\n`;
    message += `*ITEMS:* \n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n-----------------------------------\n`;
    message += `*TOTAL AMOUNT:* ₦${cartTotal.toLocaleString()}\n`;
    message += `-----------------------------------\n`;
    message += `_Payment receipt will be sent shortly._`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (showSplash) {
    return (
      <div style={styles.splashContainer}>
        <div style={styles.splashLogoCircle}>
          <img 
            src="/jollof-chicken.jpeg" 
            alt="Devick's Cravings Special" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} 
          />
        </div>

        <h1 className="brand-glow-text" style={{ fontSize: '38px', color: '#0A3A25', position: 'relative' }}>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <ChefHat size={24} style={{ position: 'absolute', top: '-16px', left: '-8px', color: '#0A3A25', transform: 'rotate(-15deg)' }} />
            D
          </span>
          evick's <span style={{ color: '#D32F2F' }}>Cravings</span>
          <Heart size={20} fill="#D32F2F" color="#D32F2F" style={{ display: 'inline-block', marginLeft: '6px', verticalAlign: 'middle' }} />
        </h1>
        <p style={{ fontSize: '11px', color: '#0A3A25', fontWeight: '800', marginTop: '8px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Satisfy your cravings with our saucy, slurpy delights.
        </p>
      </div>
    );
  }

  return (
    <div style={styles.appBackground}>
      
      {/* HEADER */}
      <header style={styles.header}>
        <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.logoContainer}>
            <img src="/hero-eating.jpeg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
          </div>
          <div style={{ flex: 1 }}>
            <h1 className="brand-glow-text" style={{ fontSize: '22px', color: '#FFF8E7', margin: 0, display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <ChefHat size={16} style={{ position: 'absolute', top: '-11px', left: '-4px', color: '#E5A900', transform: 'rotate(-15deg)' }} />
                D
              </span>
              evick's <span style={{ color: '#FF6B6B' }}>Cravings</span>
              <Heart size={14} fill="#FF6B6B" color="#FF6B6B" style={{ display: 'inline-block', marginLeft: '4px' }} />
            </h1>
            <p style={styles.tagline}>Authentic Nigerian Meals • Made with Love</p>
          </div>
        </div>
      </header>

      {/* HERO BANNER - FRIED RICE */}
      <div style={{ maxWidth: '480px', margin: '0 auto', padding: '0 16px' }}>
        
        <div style={styles.heroBanner}>
          <img src="/fried-rice-beef.jpeg" alt="Special Fried Rice" style={styles.heroImage} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
          <div style={styles.heroOverlay}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={16} style={{ color: '#E5A900' }} />
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#E5A900', textTransform: 'uppercase', letterSpacing: '1px' }}>Featured Special</span>
            </div>
            <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#FFF8E7', margin: '2px 0 0 0' }}>Special Nigerian Fried Rice</h2>
            <p style={{ fontSize: '10px', color: '#FFF8E7', margin: '2px 0 0 0', opacity: 0.9, fontWeight: '600' }}>Every Bite Saucy! Every Slurp Satisfying!</p>
          </div>
        </div>

        {/* VIBRANT BADGES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '12px' }}>
          <div className="feature-badge-item">
            <CookingPot size={16} style={{ color: '#0A3A25', marginBottom: '2px' }} />
            <p style={{ fontSize: '9px', fontWeight: '900', color: '#0A3A25', margin: 0 }}>DELICIOUS MEALS</p>
          </div>
          <div className="feature-badge-item">
            <Heart size={16} fill="#D32F2F" color="#D32F2F" style={{ marginBottom: '2px' }} />
            <p style={{ fontSize: '9px', fontWeight: '900', color: '#D32F2F', margin: 0 }}>MADE WITH LOVE</p>
          </div>
          <div className="feature-badge-item">
            <Bike size={16} style={{ color: '#0A3A25', marginBottom: '2px' }} />
            <p style={{ fontSize: '9px', fontWeight: '900', color: '#0A3A25', margin: 0 }}>FAST DELIVERY</p>
          </div>
          <div className="feature-badge-item">
            <Leaf size={16} style={{ color: '#2E7D32', marginBottom: '2px' }} />
            <p style={{ fontSize: '9px', fontWeight: '900', color: '#2E7D32', margin: 0 }}>FRESH INGREDIENTS</p>
          </div>
        </div>

        {/* SEARCH BOX */}
        <div style={{ position: 'relative', marginTop: '14px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#0A3A25', zIndex: 10 }} />
          <input 
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#666', cursor: 'pointer', zIndex: 10 }}>
              <X size={16} />
            </button>
          )}
        </div>

        {/* HORIZONTAL CATEGORY PILLS */}
        <div style={styles.pillsContainer}>
          <button 
            onClick={() => { setSelectedCategory("All"); setActiveCategoryView(null); }}
            style={selectedCategory === "All" && !activeCategoryView ? styles.pillActive : styles.pillInactive}
          >
            All Meals
          </button>
          {MAIN_CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => { setSelectedCategory(cat.category); setActiveCategoryView(null); }}
              style={selectedCategory === cat.category ? styles.pillActive : styles.pillInactive}
            >
              {cat.category}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main style={{ maxWidth: '480px', margin: '16px auto 0 auto', padding: '0 16px' }}>
        
        {/* FAST DELIVERY SHOWCASE CARD (TALLER HEIGHT & CONTAIN TO SHOW FACES FULLY) */}
        <div style={styles.deliveryCard}>
          <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
            <img 
              src="/delivery-man.jpeg" 
              alt="Branded Doorstep Delivery" 
              style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#0A3A25' }} 
              onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,58,37,0.9) 0%, transparent 70%)', display: 'flex', alignItems: 'flex-end', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bike size={22} style={{ color: '#E5A900' }} />
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '900', color: '#FFF8E7', margin: 0 }}>Fast & Reliable Doorstep Delivery</h4>
                  <p style={{ fontSize: '10px', color: '#E5A900', margin: 0, fontWeight: '700' }}>Hot, fresh meals delivered straight to your door!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH RESULTS */}
        {searchQuery.trim() !== "" ? (
          <div>
            <h3 style={{ fontSize: '12px', fontWeight: '800', color: '#0A3A25', marginBottom: '12px', textTransform: 'uppercase' }}>Search Results ({searchResults.length})</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {searchResults.map(item => (
                <div key={item.id} style={styles.foodCard}>
                  <div style={{ padding: '8px 8px 0 8px' }}>
                    <img src={item.image} alt={item.name} style={styles.foodImage} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
                    <div style={{ padding: '8px 4px 4px 4px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 3px 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '10px', color: '#666', margin: 0, height: '26px', overflow: 'hidden', lineHeight: '1.3' }}>{item.description}</p>
                    </div>
                  </div>
                  <div style={{ padding: '8px', borderTop: '1px solid #E6DFC5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAF7EE', borderRadius: '0 0 16px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#0A3A25' }}>₦{item.price.toLocaleString()}</span>
                    <button onClick={() => addToCart(item)} style={styles.addBtn}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : filteredItemsByPill ? (
          /* PILL FILTERED ITEMS */
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0A3A25', margin: 0 }}>{selectedCategory}</h3>
              <button onClick={() => setSelectedCategory("All")} style={{ background: 'none', border: 'none', color: '#D32F2F', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Show All</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {filteredItemsByPill.map(item => (
                <div key={item.id} style={styles.foodCard}>
                  <div style={{ padding: '8px 8px 0 8px' }}>
                    <img src={item.image} alt={item.name} style={styles.foodImage} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
                    <div style={{ padding: '8px 4px 4px 4px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 3px 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '10px', color: '#666', margin: 0, height: '26px', overflow: 'hidden', lineHeight: '1.3' }}>{item.description}</p>
                    </div>
                  </div>
                  <div style={{ padding: '8px', borderTop: '1px solid #E6DFC5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAF7EE', borderRadius: '0 0 16px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#0A3A25' }}>₦{item.price.toLocaleString()}</span>
                    <button onClick={() => addToCart(item)} style={styles.addBtn}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeCategoryView ? (
          /* DETAILED CATEGORY VARIATIONS */
          <div>
            <button 
              onClick={() => setActiveCategoryView(null)}
              style={{ background: '#FFFFFF', border: '1px solid #D5CBB3', color: '#0A3A25', padding: '8px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '5px', marginBottom: '16px' }}
            >
              <ChevronLeft size={16} /> All Categories
            </button>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#0A3A25', margin: '0 0 4px 0' }}>{activeCategoryView.name}</h2>
              <p style={{ fontSize: '12px', color: '#666', margin: 0, lineHeight: '1.4' }}>{activeCategoryView.description}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {activeCategoryView.items.map(item => (
                <div key={item.id} style={styles.foodCard}>
                  <div style={{ padding: '8px 8px 0 8px' }}>
                    <img src={item.image} alt={item.name} style={styles.foodImage} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
                    <div style={{ padding: '8px 4px 4px 4px' }}>
                      <h4 style={{ fontSize: '12px', fontWeight: '700', color: '#1A1A1A', margin: '0 0 3px 0' }}>{item.name}</h4>
                      <p style={{ fontSize: '10px', color: '#666', margin: 0, height: '26px', overflow: 'hidden', lineHeight: '1.3' }}>{item.description}</p>
                    </div>
                  </div>
                  <div style={{ padding: '8px', borderTop: '1px solid #E6DFC5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FAF7EE', borderRadius: '0 0 16px 16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#0A3A25' }}>₦{item.price.toLocaleString()}</span>
                    <button onClick={() => addToCart(item)} style={styles.addBtn}>
                      <Plus size={11} /> Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* MAIN CATEGORY LIST */
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: '900', color: '#0A3A25', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '12px' }}>Explore Menu Categories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {MAIN_CATEGORIES.map(cat => (
                <div key={cat.id} onClick={() => setActiveCategoryView(cat)} style={styles.catCard}>
                  <img src={cat.coverImage} alt={cat.name} style={styles.catItemImg} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 3px 0' }}>{cat.name}</h4>
                    <p style={{ fontSize: '11px', color: '#666', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{cat.description}</p>
                    <span style={{ fontSize: '10px', fontWeight: '900', color: '#0A3A25', marginTop: '6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      View {cat.items.length} Options <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* FLOATING CART BUTTON */}
      <div style={styles.floatingCart}>
        <button onClick={() => setIsCartOpen(true)} style={styles.cartCircle}>
          <ShoppingBag size={24} style={{ color: '#FFF8E7' }} />
          {totalCartCount > 0 && (
            <span style={styles.cartBadge}>
              {totalCartCount}
            </span>
          )}
        </button>
      </div>

      {/* CART DRAWER */}
      {isCartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} onClick={() => setIsCartOpen(false)} />
          <div style={{ position: 'relative', width: '100%', maxWidth: '380px', backgroundColor: '#FDFBF7', height: '100%', display: 'flex', flexDirection: 'column', zIndex: 10, borderLeft: '2px solid #0A3A25' }}>
            
            <div style={{ padding: '16px', borderBottom: '1px solid #E6DFC5', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#0A3A25' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag style={{ color: '#E5A900' }} size={20} />
                <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#FFF8E7', margin: 0 }}>My Order Cart</h3>
                <span style={{ fontSize: '11px', backgroundColor: '#D32F2F', padding: '3px 10px', borderRadius: '12px', color: '#FFF', fontWeight: '900' }}>{totalCartCount} Items</span>
              </div>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: '#FFF8E7', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '80px 0', color: '#666' }}>
                  <ShoppingBag size={42} style={{ color: '#0A3A25', opacity: 0.3, marginBottom: '10px' }} />
                  <p style={{ fontSize: '13px', fontWeight: '700' }}>Your cart is empty.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} style={{ backgroundColor: '#FFFFFF', padding: '10px 12px', borderRadius: '12px', border: '1px solid #E6DFC5', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '10px', backgroundColor: '#F0EAD6' }} onError={(e) => { e.target.src = DEFAULT_FALLBACK_IMAGE; }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h5 style={{ fontSize: '12px', fontWeight: '700', color: '#1A1A1A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h5>
                      <p style={{ fontSize: '12px', fontWeight: '900', color: '#0A3A25', margin: '3px 0 0 0' }}>₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#F5F0E1', padding: '4px 8px', borderRadius: '10px', border: '1px solid #D5CBB3' }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}><Minus size={12} /></button>
                      <span style={{ fontSize: '12px', fontWeight: '900', color: '#1A1A1A', padding: '0 6px' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}><Plus size={12} /></button>
                    </div>
                  </div>
                ))
              )}

              {cart.length > 0 && (
                <div style={{ marginTop: '20px', padding: '14px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #E6DFC5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E6DFC5', paddingBottom: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#0A3A25', textTransform: 'uppercase' }}>Bank Payment Details</span>
                  </div>

                  {BANK_DETAILS.map((bank, index) => (
                    <div key={index} style={{ backgroundColor: '#FDFBF7', padding: '10px', borderRadius: '10px', border: '1px solid #E6DFC5', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ color: '#0A3A25', fontWeight: '900', fontSize: '12px' }}>{bank.bankName}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(bank.accountNumber);
                            setCopiedBankIndex(index);
                            setTimeout(() => setCopiedBankIndex(null), 2000);
                          }} 
                          style={{ background: 'none', border: 'none', color: '#D32F2F', fontSize: '11px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                        >
                          {copiedBankIndex === index ? <Check size={12} /> : <Copy size={12} />}
                          {copiedBankIndex === index ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <p style={{ fontSize: '11px', color: '#666', margin: '4px 0 0 0', fontWeight: '700' }}>Account No: <span style={{ color: '#1A1A1A', fontWeight: '900' }}>{bank.accountNumber}</span></p>
                      <p style={{ fontSize: '11px', color: '#666', margin: '3px 0 0 0', fontWeight: '700' }}>Name: <span style={{ color: '#1A1A1A', fontWeight: '900' }}>{bank.accountName}</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{ padding: '16px', borderTop: '1px solid #E6DFC5', backgroundColor: '#FFFFFF', borderRadius: '16px 16px 0 0' }}>
                <input 
                  type="text" 
                  placeholder="Your Full Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', backgroundColor: '#FDFBF7', border: '1px solid #D5CBB3', borderRadius: '10px', color: '#1A1A1A', fontSize: '12px', fontWeight: '700', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }}
                />
                <input 
                  type="text" 
                  placeholder="Delivery Address / Landmark *"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', backgroundColor: '#FDFBF7', border: '1px solid #D5CBB3', borderRadius: '10px', color: '#1A1A1A', fontSize: '12px', fontWeight: '700', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }}
                />
                
                <div style={{ padding: '10px 12px', backgroundColor: '#FDFBF7', border: '1px solid #D5CBB3', borderRadius: '10px', fontSize: '12px', fontWeight: '800', color: '#0A3A25', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Payment Option:</span>
                  <span style={{ color: '#D32F2F', fontWeight: '900' }}>Bank Transfer (Pre-paid)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#666' }}>Cart Total:</span>
                  <span style={{ fontSize: '16px', fontWeight: '900', color: '#0A3A25' }}>₦{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  style={{ width: '100%', padding: '12px', backgroundColor: '#25D366', color: '#FFF', fontWeight: '900', border: 'none', borderRadius: '12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)' }}
                >
                  <MessageSquare size={16} /> Send Order & Payment Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#0A3A25', borderTop: '2px solid #E5A900', padding: '24px 16px 60px 16px', textAlign: 'center', color: '#FFF8E7' }}>
        <h2 className="brand-glow-text" style={{ fontSize: '26px', color: '#E5A900', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Devick's Cravings <Heart size={18} fill="#E5A900" color="#E5A900" />
        </h2>
        <p style={{ fontSize: '11px', color: '#E5A900', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Great Taste EVERY TIME!</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px', margin: '0 auto 16px auto' }}>
          <a href="https://wa.me/2349014856163" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#FFF', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '900', fontSize: '12px' }}>
            <Phone size={14} /> 09014856163
          </a>
          <a href="https://wa.me/2348091851665" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: '#25D366', color: '#FFF', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '900', fontSize: '12px' }}>
            <Phone size={14} /> 08091851665
          </a>
        </div>

        <p style={{ fontSize: '11px', margin: '0 0 4px 0', fontWeight: '700' }}>Thank you for choosing us!</p>
        <p style={{ fontSize: '10px', color: '#CCC', margin: 0 }}>Powered by LC Studio &copy; 2026</p>
      </footer>
    </div>
  );
}