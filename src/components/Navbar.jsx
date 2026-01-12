import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      name: 'Home & Living',
      subcategories: ['Reusable Kitchen', 'Bamboo Products', 'Eco Cleaning', 'Storage']
    },
    {
      name: 'Personal Care',
      subcategories: ['Soaps', 'Hair Care', 'Skin Care', 'Oral Care']
    },
    {
      name: 'Fashion & Accessories',
      subcategories: ['Organic Clothing', 'Eco Bags', 'Footwear', 'Accessories', 'Upcycled Items']
    },
    {
      name: 'Gifts & Zero-Waste Kits',
      subcategories: ['Starter Kits', 'Festival Gifts', 'Corporate Gifts', 'Travel Kits']
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
          <Link to="/" className="logo">
            <h1>Gaiaa</h1>
          </Link>
        </div>

        <div className={`nav-center ${isMenuOpen ? 'active' : ''}`}>
          {categories.map((category) => (
            <div key={category.name} className="dropdown">
              <Link to={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} 
                    className="nav-link">
                {category.name}
              </Link>
              <div className="dropdown-content">
                {category.subcategories.map((sub) => (
                  <Link key={sub} 
                        to={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${sub.toLowerCase().replace(/ /g, '-')}`}>
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
              placeholder="Search eco-friendly products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <Link to="/login" className="auth-link">Login</Link>
          <Link to="/signup" className="auth-link">Sign Up</Link>
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