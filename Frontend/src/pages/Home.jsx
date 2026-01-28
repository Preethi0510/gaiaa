import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const Home = ({ addToCart }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Care');
  const videoRefs = useRef([]);

  // Auto-sliding hero slides - 4 categories
  const heroSlides = [
    {
      id: 1,
      title: 'CARE',
      subtitle: 'Nourish Your Body & Soul',
      description: 'Natural, chemical-free personal care products for your well-being',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#75B06F',
      buttonText: 'Shop Care',
      link: '/category/care',
      category: 'care'
    },
    {
      id: 2,
      title: 'HOME & LIVING',
      subtitle: 'Sustainable Living Spaces',
      description: 'Transform your home with eco-friendly essentials',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#36656B',
      buttonText: 'Shop Home',
      link: '/category/home-living',
      category: 'home-living'
    },
    {
      id: 3,
      title: 'FASHION',
      subtitle: 'Style with Conscience',
      description: 'Ethical fashion that looks good and does good',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#DAD887',
      buttonText: 'Shop Fashion',
      link: '/category/fashion',
      category: 'fashion'
    },
    {
      id: 4,
      title: 'FOOD',
      subtitle: 'Nourish from Within',
      description: 'Organic, sustainable food for healthy living',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#F0F8A4',
      buttonText: 'Shop Food',
      link: '/category/food',
      category: 'food'
    }
  ];

  // Only 4 categories for shop section
  const shopCategories = [
    { 
      id: 1, 
      name: 'Care', 
      icon: '🧴',
      subcategories: ['Oral Care', 'Hair Care', 'Face Care', 'Body Care'],
      productCount: 45,
      color: '#75B06F',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-using-organic-beauty-products-41555-large.mp4'
    },
    { 
      id: 2, 
      name: 'Home & Living', 
      icon: '🏠',
      subcategories: ['Kitchenware', 'Tableware', 'Gardening Tools', 'Candles'],
      productCount: 68,
      color: '#36656B',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-green-plant-in-a-white-pot-39713-large.mp4'
    },
    { 
      id: 3, 
      name: 'Fashion', 
      icon: '👗',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Accessories'],
      productCount: 52,
      color: '#DAD887',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-sewing-on-a-sewing-machine-41563-large.mp4'
    },
    { 
      id: 4, 
      name: 'Food', 
      icon: '🍵',
      subcategories: ['Tea', 'Coffee', 'Beverages', 'Healthy Foods'],
      productCount: 38,
      color: '#F0F8A4',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-harvesting-organic-vegetables-from-the-garden-41560-large.mp4'
    }
  ];

  // Video collage data - one big, two small
  const videoCollage = [
    {
      id: 1,
      title: 'Sustainable Living',
      description: 'Behind the scenes of eco-friendly production',
      size: 'large',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-woman-using-organic-beauty-products-41555-large.mp4',
      category: 'Care'
    },
    {
      id: 2,
      title: 'Eco Fashion',
      description: 'Creating sustainable clothing',
      size: 'small',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-sewing-on-a-sewing-machine-41563-large.mp4',
      category: 'Fashion'
    },
    {
      id: 3,
      title: 'Organic Farming',
      description: 'From farm to table',
      size: 'small',
      video: 'https://assets.mixkit.co/videos/preview/mixkit-harvesting-organic-vegetables-from-the-garden-41560-large.mp4',
      category: 'Food'
    }
  ];

  // 20 Products for display
  const allProducts = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Eco Product ${index + 1}`,
    price: (Math.random() * 50 + 10).toFixed(2),
    ecoPoints: Math.floor(Math.random() * 200 + 50),
    image: `https://images.unsplash.com/photo-${1585238342000 + index}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=${index + 80}`,
    rating: (Math.random() * 1.5 + 3.5).toFixed(1),
    category: ['Care', 'Home & Living', 'Fashion', 'Food'][index % 4],
    subcategory: ['Oral Care', 'Kitchenware', 'Dresses', 'Tea'][index % 4]
  }));

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✓ ${product.name} added to cart! +${product.ecoPoints} eco points earned!`);
  };

  return (
    <div className="home-page">
      {/* Auto-Sliding Hero Slider - No arrows */}
      <section className="auto-slider-hero">
        <div className="slides-container">
          {heroSlides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`slide ${index === activeSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${slide.image})`,
                backgroundColor: slide.color
              }}
            >
              <div className="slide-content">
                <h1 className="slide-title">
                  <span className="pop-word">{slide.title}</span>
                </h1>
                <h2 className="slide-subtitle">
                  <span className="pop-word">{slide.subtitle}</span>
                </h2>
                <p className="slide-description">
                  {slide.description}
                </p>
                <Link to={slide.link} className="shop-now-btn-small">
                  {slide.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Navigation Dots */}
        <div className="slider-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Shop by Category Section - 4 in one row */}
      <section className="shop-by-category">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Explore our sustainable collections</p>
          </div>
          
          <div className="category-cards-four">
            {shopCategories.map((category) => (
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

      {/* Video Collage Section - 1 big, 2 small */}
      <section className="video-collage-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sustainable Stories</h2>
            <p className="section-subtitle">See our products in action</p>
          </div>
          
          <div className="video-collage-grid">
            {videoCollage.map((video, index) => (
              <div 
                key={video.id} 
                className={`video-collage-item ${video.size}`}
              >
                <div className="video-placeholder">
                  <div className="play-icon">
                    <i className="fas fa-play"></i>
                  </div>
                  <p>Video: {video.title}</p>
                </div>
                <div className="video-info-overlay">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <span className="video-category">{video.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section - 20 products, 4 in a row */}
      <section className="all-products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Our best-selling sustainable items</p>
          </div>
          
          <div className="products-grid-four">
            {allProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
          
          <div className="view-all-container">
            <Link to="/products" className="view-all-btn-small">
              View All Products <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;