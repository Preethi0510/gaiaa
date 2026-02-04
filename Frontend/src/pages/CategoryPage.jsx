import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../components/ProductCard';

const CategoryPage = ({ category: propCategory, addToCart }) => {
  const { categorySlug } = useParams();
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  // Get category from props or URL - prioritize props
  const categoryKey = propCategory || categorySlug;

  // Category data mapping
  const categoryData = {
    'care': {
      title: 'CARE',
      description: 'Natural, chemical-free personal care products for your well-being',
      heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#75B06F',
      subcategories: ['Oral Care', 'Hair Care', 'Face Care', 'Body Care'],
      slug: 'care'
    },
    'home-living': {
      title: 'HOME & LIVING',
      description: 'Transform your home with eco-friendly essentials',
      heroImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#36656B',
      subcategories: ['Kitchenware', 'Tableware', 'Gardening Tools', 'Candles', 'Bathroom Essentials', 'Yoga Essentials'],
      slug: 'home-living'
    },
    'fashion': {
      title: 'FASHION',
      description: 'Ethical fashion that looks good and does good',
      heroImage: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#DAD887',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Ethnic Wears', 'Accessories'],
      slug: 'fashion'
    },
    'food': {
      title: 'FOOD',
      description: 'Organic, sustainable food for healthy living',
      heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#F0F8A4',
      subcategories: ['Tea', 'Coffee', 'Beverages', 'Healthy Foods'],
      slug: 'food'
    }
  };

  // Get current category or default to care
  const currentCategory = categoryData[categoryKey] || categoryData.care;

  // Product data for each category
  const productsByCategory = {
    'care': [
      { id: 1, name: 'Bamboo Toothbrush Set', price: 12.99, ecoPoints: 65, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7, subcategory: 'Oral Care' },
      { id: 2, name: 'Natural Shampoo Bar', price: 11.99, ecoPoints: 60, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6, subcategory: 'Hair Care' },
      { id: 3, name: 'Organic Face Cream', price: 24.99, ecoPoints: 125, image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8, subcategory: 'Face Care' },
      { id: 4, name: 'Herbal Body Oil', price: 19.99, ecoPoints: 100, image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5, subcategory: 'Body Care' },
    ],
    'home-living': [
      { id: 5, name: 'Bamboo Utensil Set', price: 24.99, ecoPoints: 125, image: 'https://images.unsplash.com/photo-1585238342070-61e1e2b6c8d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8, subcategory: 'Kitchenware' },
      { id: 6, name: 'Ceramic Dinner Set', price: 89.99, ecoPoints: 450, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.9, subcategory: 'Tableware' },
    ],
    'fashion': [
      { id: 7, name: 'Organic Cotton Dress', price: 49.99, ecoPoints: 250, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7, subcategory: 'Dresses' },
      { id: 8, name: 'Sustainable T-shirt', price: 29.99, ecoPoints: 150, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5, subcategory: 'Tops' },
    ],
    'food': [
      { id: 9, name: 'Organic Green Tea', price: 14.99, ecoPoints: 75, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7, subcategory: 'Tea' },
      { id: 10, name: 'Fair Trade Coffee', price: 18.99, ecoPoints: 95, image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8, subcategory: 'Coffee' },
    ]
  };

  const products = productsByCategory[categoryKey] || productsByCategory.care;
  const filteredProducts = activeSubcategory === 'All'
    ? products
    : products.filter(p => p.subcategory === activeSubcategory);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="category-page">
      {/* Category Hero */}
      <section className="static-category-hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${currentCategory.heroImage})`
      }}>
        <div className="container">
          <div className="static-hero-content">
            <h1>{currentCategory.title}</h1>
            <p>{currentCategory.description}</p>
          </div>
        </div>
      </section>

      {/* Subcategory Navigation */}
      <section className="subcategory-nav">
        <div className="container">
          <div className="subcategory-tabs">
            <button
              className={`subcategory-tab ${activeSubcategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveSubcategory('All')}
            >
              All Products
            </button>
            {currentCategory.subcategories.map((subcat) => (
              <button
                key={subcat}
                className={`subcategory-tab ${activeSubcategory === subcat ? 'active' : ''}`}
                onClick={() => setActiveSubcategory(subcat)}
              >
                {subcat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="category-products">
        <div className="container">
          <div className="products-header">
            <h2>{activeSubcategory === 'All' ? 'All Products' : activeSubcategory}</h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid-four">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🛒</div>
              <h3>Coming Soon! More products will be added.</h3>
              <Link to="/" className="back-to-home">
                <i className="fas fa-arrow-left"></i> Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;