import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import BiologyFact from './components/BiologyFact';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import DiscountPopup from './components/DiscountPopup';
import Toast from './components/Toast';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [cart, setCart] = useState([]);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        setShowDiscountPopup(true);
        localStorage.setItem('hasVisited', 'true');
      }, 2000);
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    showToast(`✓ ${product.name} added to cart! +${product.ecoPoints} eco points earned!`);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <BiologyFact />
        <Navbar cartCount={cart.length} />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home addToCart={addToCart} />} />

          {/* Individual Category Routes */}
          <Route path="/category/care" element={<CategoryPage category="care" addToCart={addToCart} />} />
          <Route path="/category/home-living" element={<CategoryPage category="home-living" addToCart={addToCart} />} />
          <Route path="/category/fashion" element={<CategoryPage category="fashion" addToCart={addToCart} />} />
          <Route path="/category/food" element={<CategoryPage category="food" addToCart={addToCart} />} />

          {/* Dynamic route for any category */}
          <Route path="/category/:categorySlug" element={<CategoryPage addToCart={addToCart} />} />

          {/* Other Pages */}
          <Route path="/product/:productId" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login showToast={showToast} />} />
          <Route path="/signup" element={<Signup showToast={showToast} />} />
        </Routes>
        <Footer showToast={showToast} />
        <BackToTop />
        {showDiscountPopup && <DiscountPopup onClose={() => setShowDiscountPopup(false)} />}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;