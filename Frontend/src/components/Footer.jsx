import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">Gaiaa</h3>
          <p className="footer-description">
            Your destination for sustainable living. Join us in making the world greener, one purchase at a time.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-pinterest-p"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><a href="/category/home-living">Home & Living</a></li>
            <li><a href="/category/personal-care">Personal Care</a></li>
            <li><a href="/category/fashion-accessories">Fashion & Accessories</a></li>
            <li><a href="/category/gifts-zero-waste-kits">Gifts & Zero-Waste Kits</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <p><i className="fas fa-envelope"></i> hello@gaiaa.com</p>
            <p><i className="fas fa-phone"></i> +91 98765 43210</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Green Street, Mumbai, India</p>
          </div>
          <div className="newsletter">
            <h5>Subscribe to Newsletter</h5>
            <div className="newsletter-input">
              <input type="email" placeholder="Your email" />
              <button><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gaiaa. All rights reserved. Made with <i className="fas fa-heart"></i> for our planet.</p>
        <div className="payment-methods">
          <i className="fab fa-cc-visa"></i>
          <i className="fab fa-cc-mastercard"></i>
          <i className="fab fa-cc-paypal"></i>
          <i className="fab fa-cc-amazon-pay"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;