import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }

    return stars;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-link">
        <div className="product-image">
          <img src={product.image || (product.images && product.images[0])} alt={product.name} />
          <div className="eco-badge">
            <i className="fas fa-leaf"></i>
            {product.ecoPoints} pts
          </div>
        </div>
      </Link>
      <div className="product-content">
        <Link to={`/product/${product.id}`}>
          <h4>{product.name}</h4>
        </Link>
        <div className="product-price">₹{product.price || (product.variants && product.variants[0]?.price)}</div>
        <div className="product-rating">
          {renderStars(product.rating)}
          <span>({product.rating})</span>
        </div>
        <div className="product-category">
          <span className="category-badge">{product.category}</span>
          <span className="subcategory-badge">{product.subcategory}</span>
        </div>
        <button className="add-to-cart-btn-small" onClick={onAddToCart}>
          <i className="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;