import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      name: 'SHOP',
      subcategories: ['All Products', 'New Arrivals', 'Best Sellers', 'On Sale']

    },
    {
      name: 'CARE',
      subcategories: ['Oral Care', 'Hair Care', 'Face Care', 'Body Care']
    },
    {
      name: 'HOME & LIVING',
      subcategories: ['Kitchenware', 'Tableware', 'Gardening Tools', 'Candles', 'Bathroom Essentials', 'Yoga Essentials']
    },
    {
      name: 'FASHION',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Ethnic Wears', 'Accessories']
    },
    {
      name: 'FOOD',
      subcategories: ['Tea', 'Coffee', 'Beverages', 'Healthy Foods']
    }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
            <h1>Gaiaa</h1>
          </Link>
        </div>

        <div className={`nav-center ${isMenuOpen ? 'active' : ''}`}>
          {categories.map((category) => (
            <div key={category.name} className="dropdown">
              <Link to={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}>
                {category.name}
              </Link>
              <div className="dropdown-content">
                {category.subcategories.map((sub) => (
                  <Link key={sub}
                    to={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${sub.toLowerCase().replace(/ /g, '-')}`}
                    onClick={() => setIsMenuOpen(false)}>
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="nav-right">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search sustainable products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <Link to="/login" className="auth-link" onClick={() => setIsMenuOpen(false)}>Login</Link>
          <Link to="/signup" className="auth-link" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;