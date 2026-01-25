import React from 'react';
import './DiscountPopup.css';

const DiscountPopup = ({ onClose }) => {
  return (
    <div className="discount-popup-overlay">
      <div className="discount-popup">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="popup-content">
          <div className="discount-icon">
            <i className="fas fa-gift"></i>
          </div>
          
          <h2>Welcome to Gaiaa!</h2>
          <p className="discount-text">
            Get <span className="highlight">20% OFF</span> on your first order
          </p>
          <p className="popup-subtext">
            Plus, earn extra Eco Points for every purchase
          </p>
          
          <div className="coupon-code">
            <span>Use Code:</span>
            <div className="code">GAIA20</div>
          </div>
          
          <button className="shop-now-btn" onClick={onClose}>
            Start Shopping
          </button>
          
          <p className="terms">
            *Valid for new users only. Min. purchase ₹500
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;