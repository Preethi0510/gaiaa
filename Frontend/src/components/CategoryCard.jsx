import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  // Generate proper URL path with URL encoding
  const getCategoryPath = (name) => {
    // Convert "Home & Living" to "home-living"
    const slug = name.toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    return `/category/${slug}`;
  };

  const categoryPath = getCategoryPath(category.name);

  return (
    <Link 
      to={categoryPath} 
      className="category-card-link"
    >
      <div className="category-card">
        <div className="category-image">
          <img src={category.image} alt={category.name} />
        </div>
        <div className="category-content">
          <h3>{category.name}</h3>
          <div className="category-subcategories">
            {category.subcategories.slice(0, 3).map((sub, index) => (
              <span key={index} className="subcategory-tag">{sub}</span>
            ))}
            {category.subcategories.length > 3 && (
              <span className="subcategory-tag">+{category.subcategories.length - 3} more</span>
            )}
          </div>
          <div className="category-footer">
            <span className="product-count">{category.productCount} products</span>
            <span className="explore-link">
              Explore <i className="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;