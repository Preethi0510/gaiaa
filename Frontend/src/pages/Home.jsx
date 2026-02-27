import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import API from '../api';

const Home = ({ addToCart }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]);

  // Auto-sliding hero slides
  const heroSlides = [
    {
      id: 1,
      title: 'CARE',
      subtitle: 'Nourish Your Body & Soul',
      description: 'Natural, chemical-free personal care products for your well-being',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#75B06F',
      buttonText: 'Shop Care',
      link: '/category/care'
    },
    {
      id: 2,
      title: 'HOME & LIVING',
      subtitle: 'Sustainable Living Spaces',
      description: 'Transform your home with eco-friendly essentials',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#36656B',
      buttonText: 'Shop Home',
      link: '/category/home-living'
    },
    {
      id: 3,
      title: 'FASHION',
      subtitle: 'Style with Conscience',
      description: 'Ethical fashion that looks good and does good',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#DAD887',
      buttonText: 'Shop Fashion',
      link: '/category/fashion'
    },
    {
      id: 4,
      title: 'FOOD',
      subtitle: 'Nourish from Within',
      description: 'Organic, sustainable food for healthy living',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
      color: '#F0F8A4',
      buttonText: 'Shop Food',
      link: '/category/food'
    }
  ];

  // Professional category data
  const shopCategories = [
    {
      id: 1,
      name: 'Care',
      subcategories: ['Oral Care', 'Hair Care', 'Face Care', 'Body Care'],
      productCount: 45,
      color: '#75B06F',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 2,
      name: 'Home & Living',
      subcategories: ['Kitchenware', 'Tableware', 'Gardening Tools', 'Candles'],
      productCount: 68,
      color: '#36656B',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 3,
      name: 'Fashion',
      subcategories: ['Dresses', 'Tops', 'Bottoms', 'Accessories'],
      productCount: 52,
      color: '#DAD887',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 4,
      name: 'Food',
      subcategories: ['Tea', 'Coffee', 'Beverages', 'Healthy Foods'],
      productCount: 38,
      color: '#F0F8A4',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Auto-play video URLs (replace with your actual videos)
  const videoData = [
    {
      id: 1,
      title: 'Sustainable Production',
      description: 'How we create eco-friendly products',
      size: 'large',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-using-organic-beauty-products-41555-large.mp4',
      poster: 'https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Eco Packaging',
      description: 'Zero-waste packaging solutions',
      size: 'small',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-wrapping-a-gift-41558-large.mp4',
      poster: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      title: 'Customer Stories',
      description: 'Real experiences with our products',
      size: 'small',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-harvesting-organic-vegetables-from-the-garden-41560-large.mp4',
      poster: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];


  // Auto slide every 5 seconds
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/products");
        setAllProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play videos on mount
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.play().catch(e => console.log("Auto-play prevented:", e));
      }
    });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="home-page">
      {/* Auto-Sliding Hero Slider */}
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

      {/* Shop by Category Section */}
      <section className="shop-by-category">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Discover our sustainable collections</p>
          </div>

          <div className="category-cards-four">
            {shopCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Video Collage Section with Auto-play */}
      <section className="video-collage-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Sustainable Stories</h2>
            <p className="section-subtitle">Experience our eco-friendly journey</p>
          </div>

          <div className="video-collage-grid">
            {videoData.map((video, index) => (
              <div key={video.id} className={`video-collage-item ${video.size}`}>
                <div className="video-container">
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={video.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={video.poster}
                    className="auto-play-video"
                  />
                  <div className="video-info-overlay">
                    <h3>{video.title}</h3>
                    <p>{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="all-products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Our best-selling sustainable items</p>
          </div>

          <div className="products-grid-four">
            {loading ? (
              <p>Loading featured products...</p>
            ) : allProducts.length > 0 ? (
              allProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))
            ) : (
              <p>No featured products available.</p>
            )}
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