import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Home & Living');
  
  // Category data
  const categories = [
    { 
      id: 1, 
      name: 'Home & Living', 
      icon: '🏠',
      subcategories: ['Reusable Kitchen', 'Bamboo Products', 'Eco Cleaning', 'Storage'],
      productCount: 28,
      color: '#75B06F',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 2, 
      name: 'Personal Care', 
      icon: '🧴',
      subcategories: ['Soaps', 'Hair Care', 'Skin Care', 'Oral Care'],
      productCount: 32,
      color: '#8BC34A',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 3, 
      name: 'Fashion & Accessories', 
      icon: '👕',
      subcategories: ['Organic Clothing', 'Eco Bags', 'Footwear', 'Accessories', 'Upcycled Items'],
      productCount: 45,
      color: '#4CAF50',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 4, 
      name: 'Gifts & Zero-Waste Kits', 
      icon: '🎁',
      subcategories: ['Starter Kits', 'Festival Gifts', 'Corporate Gifts', 'Travel Kits'],
      productCount: 24,
      color: '#2E7D32',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Video data
  const videos = [
    {
      id: 1,
      title: 'Sustainable Living Tips',
      description: 'Learn how to reduce waste in your daily life',
      duration: '5:32',
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isLarge: true
    },
    {
      id: 2,
      title: 'Eco-friendly DIY',
      description: 'Make your own zero-waste products',
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Behind the Scenes',
      description: 'How our products are made sustainably',
      duration: '4:15',
      thumbnail: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Product data by subcategory
  const subcategoryProducts = {
    'Reusable Kitchen': [
      { id: 1, name: 'Bamboo Cutlery Set', price: 24.99, ecoPoints: 120, image: 'https://images.unsplash.com/photo-1585238342070-61e1e2b6c8d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5 },
      { id: 2, name: 'Silicone Food Covers', price: 18.50, ecoPoints: 90, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.2 },
      { id: 3, name: 'Reusable Coffee Cup', price: 22.99, ecoPoints: 110, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7 },
      { id: 4, name: 'Beeswax Wraps', price: 16.99, ecoPoints: 80, image: 'https://images.unsplash.com/photo-1581497396204-9a7518071f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.4 }
    ],
    'Bamboo Products': [
      { id: 5, name: 'Bamboo Toothbrush', price: 8.99, ecoPoints: 45, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.3 },
      { id: 6, name: 'Bamboo Cutting Board', price: 34.99, ecoPoints: 150, image: 'https://images.unsplash.com/photo-1543246652-7f5a5c332b8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6 },
      { id: 7, name: 'Bamboo Straw Set', price: 12.99, ecoPoints: 65, image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.1 },
      { id: 8, name: 'Bamboo Utensil Set', price: 19.99, ecoPoints: 100, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8 }
    ],
    'Soaps': [
      { id: 9, name: 'Lavender Bar Soap', price: 6.99, ecoPoints: 35, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.4 },
      { id: 10, name: 'Charcoal Face Soap', price: 9.99, ecoPoints: 50, image: 'https://images.unsplash.com/photo-1594736797933-d0c6e4d6d6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5 },
      { id: 11, name: 'Tea Tree Soap', price: 7.50, ecoPoints: 38, image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.2 },
      { id: 12, name: 'Organic Shampoo Bar', price: 11.99, ecoPoints: 60, image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7 }
    ],
    'Hair Care': [
      { id: 13, name: 'Bamboo Hair Brush', price: 14.99, ecoPoints: 75, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6 },
      { id: 14, name: 'Natural Conditioner', price: 16.99, ecoPoints: 85, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.3 },
      { id: 15, name: 'Herbal Hair Oil', price: 19.99, ecoPoints: 100, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8 },
      { id: 16, name: 'Scalp Massager', price: 9.99, ecoPoints: 50, image: 'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.1 }
    ]
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart! +${product.ecoPoints} eco points earned!`);
  };

  return (
    <div className="home-page">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slide">
          <div className="slide-content">
            <h1>Sustainable Living Made Beautiful</h1>
            <p>Discover eco-friendly products that are good for you and the planet. Earn eco points with every purchase!</p>
            <Link to="/category/home-living" className="btn-primary">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="shop-by-category">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                onClick={() => setActiveCategory(category.name)}
                isActive={activeCategory === category.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="video-grid-section">
        <div className="container">
          <h2 className="section-title">Eco Inspiration</h2>
          <div className="video-grid">
            <div className="video-main">
              <div className="video-card large">
                <img src={videos[0].thumbnail} alt={videos[0].title} />
                <div className="video-overlay">
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="video-info">
                    <h3>{videos[0].title}</h3>
                    <p>{videos[0].description}</p>
                    <span className="video-duration">{videos[0].duration}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="video-side">
              {videos.slice(1).map((video) => (
                <div className="video-card small" key={video.id}>
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-overlay">
                    <div className="play-button">
                      <i className="fas fa-play"></i>
                    </div>
                    <div className="video-info">
                      <h4>{video.title}</h4>
                      <span className="video-duration">{video.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Subcategory Product Sections */}
      <section className="subcategory-products">
        <div className="container">
          <div className="subcategory-tabs">
            {categories
              .find(cat => cat.name === activeCategory)
              ?.subcategories.map((subcategory, index) => (
                <button 
                  key={index}
                  className={`subcategory-tab ${index === 0 ? 'active' : ''}`}
                >
                  {subcategory}
                </button>
              ))}
          </div>

          {Object.entries(subcategoryProducts).map(([subcategory, products]) => (
            <div key={subcategory} className="subcategory-section">
              <div className="subcategory-header">
                <h3 className="subcategory-title">{subcategory}</h3>
                <Link to={`/category/${activeCategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`} 
                      className="view-all-btn">
                  View All <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={() => handleAddToCart(product)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;