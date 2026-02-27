import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CategoryPage.css';
import ProductCard from '../components/ProductCard';
import API from '../api';

const CategoryPage = ({ category: propCategory, addToCart }) => {
  const { categorySlug } = useParams();
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get category from props or URL - prioritize props
  const categoryKey = propCategory || categorySlug;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/products");
        // Filter products by category if the API returns all products
        // Assuming products have a 'category' or 'categorySlug' field
        const filtered = response.data.filter(p => 
          p.category === categoryKey || p.categorySlug === categoryKey
        );
        setProducts(filtered.length > 0 ? filtered : response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryKey]);

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