import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <div className="product-tags">
          <span className="eco-badge">Eco-Friendly</span>
          {product.isNew && <span className="new-badge">New</span>}
        </div>
        <button className="quick-view-btn">Quick View</button>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-meta">
          <div className="eco-points">
            <i className="fas fa-leaf"></i>
            <span>{product.ecoPoints} Eco Points</span>
          </div>
          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <i key={i} className={`fas fa-star ${i < product.rating ? 'filled' : ''}`}></i>
            ))}
            <span>({product.reviews})</span>
          </div>
        </div>
        
        <div className="product-footer">
          <div className="price-container">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
          >
            <span>Add to Cart</span>
            <i className="fas fa-shopping-bag"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;