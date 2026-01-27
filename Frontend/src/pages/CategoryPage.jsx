import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../components/ProductCard';

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams();
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  
  // Category hero images
  const categoryHeroes = {
    'care': {
      title: 'Natural Care Collection',
      description: 'Pamper yourself with chemical-free, sustainable personal care products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#75B06F'
    },
    'home-living': {
      title: 'Sustainable Home Essentials',
      description: 'Transform your living space with eco-friendly home products',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#36656B'
    },
    'fashion': {
      title: 'Eco-Friendly Fashion',
      description: 'Stylish clothing and accessories made with sustainable materials',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#DAD887'
    },
    'food': {
      title: 'Organic & Healthy Foods',
      description: 'Nourish your body with sustainably sourced, organic food products',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#F0F8A4'
    }
  };

  const currentCategory = categoryHeroes[categoryName] || categoryHeroes.care;

  return (
    <div className="category-page">
      {/* Category Hero Section */}
      <section className="category-hero" style={{ backgroundColor: currentCategory.color }}>
        <div className="container">
          <div className="category-hero-content">
            <h1>{currentCategory.title}</h1>
            <p>{currentCategory.description}</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">150+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">4.8</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Sustainable</span>
              </div>
            </div>
          </div>
          <div className="category-hero-image">
            <img src={currentCategory.image} alt={currentCategory.title} />
          </div>
        </div>
      </section>

      {/* Category Content */}
      <section className="category-content">
        <div className="container">
          <div className="category-tabs">
            {['All', 'Oral Care', 'Hair Care', 'Face Care', 'Body Care'].map((subcat) => (
              <button
                key={subcat}
                className={`category-tab oval-btn ${activeSubcategory === subcat ? 'active' : ''}`}
                onClick={() => setActiveSubcategory(subcat)}
              >
                {subcat}
              </button>
            ))}
          </div>

          <div className="category-products">
            <h2>Featured Products</h2>
            <div className="products-grid three-column">
              {/* Add your product cards here */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;