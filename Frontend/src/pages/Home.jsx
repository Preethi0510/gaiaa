import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('CARE');
  
  // Updated Category data
  const categories = [
    { 
      id: 1, 
      name: 'CARE', 
      icon: '🧴',
      subcategories: ['Oral Care', 'Hair Care', 'Face Care', 'Body Care'],
      productCount: 45,
      color: '#75B06F',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 2, 
      name: 'HOME & LIVING', 
      icon: '🏠',
      subcategories: ['Kitchenware', 'Tableware', 'Gardening Tools', 'Candles', 'Bathroom Essentials', 'Yoga Essentials'],
      productCount: 68,
      color: '#36656B',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 3, 
      name: 'FASHION', 
      icon: '👗',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Ethnic Wears', 'Accessories'],
      productCount: 52,
      color: '#DAD887',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    { 
      id: 4, 
      name: 'FOOD', 
      icon: '🍵',
      subcategories: ['Tea', 'Coffee', 'Beverages', 'Healthy Foods'],
      productCount: 38,
      color: '#F0F8A4',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Video data
  const videos = [
    {
      id: 1,
      title: 'Sustainable Living Journey',
      description: 'Discover how to make eco-friendly choices every day',
      duration: '6:15',
      thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      isLarge: true
    },
    {
      id: 2,
      title: 'Zero-Waste Kitchen',
      description: 'Transform your kitchen into eco-friendly space',
      duration: '4:30',
      thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Organic Farming',
      description: 'Behind the scenes of sustainable agriculture',
      duration: '5:45',
      thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];

  // Product data by subcategory (3 products per row)
  const subcategoryProducts = {
    'Oral Care': [
      { id: 1, name: 'Bamboo Toothbrush Set', price: 12.99, ecoPoints: 65, image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7 },
      { id: 2, name: 'Natural Toothpaste', price: 8.99, ecoPoints: 45, image: 'https://images.unsplash.com/photo-1626870050017-6e54d1b04f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5 },
      { id: 3, name: 'Charcoal Dental Floss', price: 6.99, ecoPoints: 35, image: 'https://images.unsplash.com/photo-1594736797933-d0c6e4d6d6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.3 },
      { id: 4, name: 'Mouthwash Tablets', price: 14.99, ecoPoints: 75, image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6 },
      { id: 5, name: 'Tongue Cleaner', price: 5.99, ecoPoints: 30, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.2 },
      { id: 6, name: 'Oil Pulling Kit', price: 18.99, ecoPoints: 95, image: 'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8 }
    ],
    'Hair Care': [
      { id: 7, name: 'Shampoo Bar', price: 11.99, ecoPoints: 60, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6 },
      { id: 8, name: 'Bamboo Hair Brush', price: 16.99, ecoPoints: 85, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.4 },
      { id: 9, name: 'Natural Conditioner', price: 13.99, ecoPoints: 70, image: 'https://images.unsplash.com/photo-1594736797933-d0c6e4d6d6c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5 },
      { id: 10, name: 'Herbal Hair Oil', price: 19.99, ecoPoints: 100, image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7 },
      { id: 11, name: 'Scalp Massager', price: 9.99, ecoPoints: 50, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.3 },
      { id: 12, name: 'Silk Hair Wrap', price: 14.99, ecoPoints: 75, image: 'https://images.unsplash.com/photo-1596703923338-48f1c07e4f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6 }
    ],
    'Kitchenware': [
      { id: 13, name: 'Bamboo Utensil Set', price: 24.99, ecoPoints: 125, image: 'https://images.unsplash.com/photo-1585238342070-61e1e2b6c8d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.8 },
      { id: 14, name: 'Silicone Food Covers', price: 18.50, ecoPoints: 93, image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.4 },
      { id: 15, name: 'Reusable Coffee Cup', price: 22.99, ecoPoints: 115, image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.7 },
      { id: 16, name: 'Beeswax Wraps', price: 16.99, ecoPoints: 85, image: 'https://images.unsplash.com/photo-1581497396204-9a7518071f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.5 },
      { id: 17, name: 'Glass Storage Set', price: 34.99, ecoPoints: 175, image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.9 },
      { id: 18, name: 'Compost Bin', price: 29.99, ecoPoints: 150, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', rating: 4.6 }
    ]
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✓ ${product.name} added to cart! +${product.ecoPoints} eco points earned!`);
  };

  return (
    <div className="home-page">
      {/* Hero Slider Section - Words Pop Up Animation */}
      <section className="hero-slider">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="word-pop">Welcome</span>
              <span className="word-pop">to</span>
              <span className="word-pop">Gaiaa</span>
            </h1>
            <h2 className="hero-subtitle">
              <span className="word-pop">Sustainable</span>
              <span className="word-pop">Living</span>
              <span className="word-pop">Reimagined</span>
            </h2>
            <p className="hero-description">
              Discover eco-friendly products that nourish both you and the planet.
              Every purchase contributes to a greener future.
            </p>
            <div className="hero-buttons">
              <Link to="/category/care" className="oval-btn">
                <i className="fas fa-leaf"></i> Shop Now
              </Link>
              <Link to="/sustainability-guide" className="oval-btn oval-btn-secondary">
                <i className="fas fa-book"></i> Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Sustainable Living" />
          </div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="shop-by-category">
        <div className="container">
          <h2 className="section-title">Explore Our Categories</h2>
          <p className="section-subtitle">Discover sustainable products for every aspect of your life</p>
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
          <p className="section-subtitle">Watch our journey towards sustainable living</p>
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

      {/* Subcategory Product Sections - 3 in a row */}
      <section className="subcategory-products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Best sellers from each category</p>
          
          <div className="subcategory-tabs">
            {categories
              .find(cat => cat.name === activeCategory)
              ?.subcategories.map((subcategory, index) => (
                <button 
                  key={index}
                  className={`subcategory-tab oval-btn ${index === 0 ? 'active' : ''}`}
                >
                  {subcategory}
                </button>
              ))}
          </div>

          {Object.entries(subcategoryProducts).map(([subcategory, products]) => (
            <div key={subcategory} className="subcategory-section">
              <div className="subcategory-header">
                <h3 className="subcategory-title">{subcategory}</h3>
                <Link 
                  to={`/category/${activeCategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${subcategory.toLowerCase().replace(/ /g, '-')}`} 
                  className="view-all-btn oval-btn oval-btn-secondary"
                >
                  View All <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
              <div className="products-grid three-column">
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