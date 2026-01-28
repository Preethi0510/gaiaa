import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category, onClick, isActive }) => {
  const getCategoryPath = (name) => {
    return `/category/${name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
  };

  return (
    <div className="category-card-wrapper">
      <Link 
        to={getCategoryPath(category.name)}
        className="category-card-link"
        onClick={(e) => {
          if (onClick) {
            onClick();
          }
        }}
      >
        <div className={`category-card ${isActive ? 'active' : ''}`}>
          <div className="category-image">
            <img src={category.image} alt={category.name} />
            <div className="category-icon">{category.icon}</div>
          </div>
          <div className="category-content">
            <h3>{category.name}</h3>
            <div className="category-subcategories">
              {category.subcategories.slice(0, 3).map((sub, index) => (
                <span key={index}>{sub}</span>
              ))}
              {category.subcategories.length > 3 && (
                <span>+{category.subcategories.length - 3} more</span>
              )}
            </div>
            <div className="category-count">
              {category.productCount} Products
            </div>
            <div className="category-link">
              Explore Category <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;