import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryCard.css';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const getCategoryPath = (name) => {
    return `/category/${name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`;
  };

  const handleClick = () => {
    navigate(getCategoryPath(category.name));
  };

  return (
    <div 
      className="category-card" 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="category-image">
        <img src={category.image} alt={category.name} />
      </div>
      <div className="category-content">
        <h3>{category.name}</h3>
        <div className="category-subcategories">
          {category.subcategories.map((sub, index) => (
            <span key={index} className="subcategory-tag">{sub}</span>
          ))}
        </div>
        <div className="category-footer">
          <span className="product-count">{category.productCount} products</span>
          <span className="explore-link">
            Explore Collection <i className="fas fa-arrow-right"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;