import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../components/ProductCard';

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams();
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  // Static category hero data (not sliding)
  const categoryData = {
    'care': {
      title: 'CARE',
      description: 'Natural, chemical-free personal care products for your well-being',
      heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#75B06F',
      subcategories: ['Oral Care', 'Hair Care', 'Face Care', 'Body Care'],
      icon: '🧴'
    },
    'home-living': {
      title: 'HOME & LIVING',
      description: 'Transform your home with eco-friendly essentials',
      heroImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#36656B',
      subcategories: ['Kitchenware', 'Tableware', 'Gardening Tools', 'Candles', 'Bathroom Essentials', 'Yoga Essentials'],
      icon: '🏠'
    },
    'fashion': {
      title: 'FASHION',
      description: 'Ethical fashion that looks good and does good',
      heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#DAD887',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Ethnic Wears', 'Accessories'],
      icon: '👗'
    },
    'food': {
      title: 'FOOD',
      description: 'Organic, sustainable food for healthy living',
      heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#F0F8A4',
      subcategories: ['Tea', 'Coffee', 'Beverages', 'Healthy Foods'],
      icon: '🍵'
    }
  };

  // ... rest of the category page code ...

  return (
    <div className="category-page">
      {/* Static Category Hero (NOT SLIDING) */}
      <section className="static-category-hero" style={{ 
        backgroundColor: currentCategory.color
      }}>
        <div className="container">
          <div className="static-hero-content">
            <div className="category-icon-large">{currentCategory.icon}</div>
            <h1>{currentCategory.title}</h1>
            <p>{currentCategory.description}</p>
            <div className="category-stats">
              <div className="stat">
                <span className="number">{products.length}</span>
                <span className="label">Products</span>
              </div>
              <div className="stat">
                <span className="number">4.7</span>
                <span className="label">Avg Rating</span>
              </div>
              <div className="stat">
                <span className="number">{currentCategory.subcategories.length}</span>
                <span className="label">Collections</span>
              </div>
            </div>
          </div>
          <div className="hero-image-container">
            <img src={currentCategory.heroImage} alt={currentCategory.title} className="hero-image" />
          </div>
        </div>
      </section>

      {/* ... rest of category page ... */}
    </div>
  );
};

export default CategoryPage;