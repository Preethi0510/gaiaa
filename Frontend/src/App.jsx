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
import AdminRoute from './components/AdminRoute';

// Placeholder Admin Dashboard component
const AdminDashboard = () => (
  <div className="container" style={{ padding: '100px 0' }}>
    <h1>Admin Dashboard</h1>
    <p>Welcome, Admin! This is a protected route.</p>
  </div>
);

function App() {
  const [cart, setCart] = useState([]);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token && role) {
      setUser({ token, role });
    }

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

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    showToast("Logged out successfully");
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
        <Navbar cartCount={cart.length} user={user} onLogout={handleLogout} />
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

          {/* Admin Dashboard */}
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />

          {/* Other Pages */}
          <Route path="/product/:productId" element={<ProductPage addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login showToast={showToast} onLogin={handleLogin} />} />
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