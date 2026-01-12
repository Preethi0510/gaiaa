import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = ({ addToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState('home-living');

  // Hero slides based on YOUR original categories
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600",
      title: "Gifts they'll Keep",
      description: "Thoughtful presents that make a lasting impression and positive impact",
      category: "gifts-zero-waste-kits"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600",
      title: "Home & Living",
      description: "Sustainable products for an eco-conscious home",
      category: "home-living"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1556228578-9c360e1d8d34?w=1600",
      title: "Personal Care",
      description: "Natural products for your wellness routine",
      category: "personal-care"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1600",
      title: "Fashion & Accessories",
      description: "Ethical fashion that looks good and does good",
      category: "fashion-accessories"
    }
  ];

  // Use YOUR original categories (not Brown Living's)
  const categories = [
    { 
      id: 'home-living', 
      name: 'Home & Living',
      subcategories: ['Reusable Kitchen', 'Bamboo Products', 'Eco Cleaning', 'Storage']
    },
    { 
      id: 'personal-care', 
      name: 'Personal Care',
      subcategories: ['Soaps', 'Hair Care', 'Skin Care', 'Oral Care']
    },
    { 
      id: 'fashion-accessories', 
      name: 'Fashion & Accessories',
      subcategories: ['Organic Clothing', 'Eco Bags', 'Footwear', 'Accessories', 'Upcycled Items']
    },
    { 
      id: 'gifts-zero-waste-kits', 
      name: 'Gifts & Zero-Waste Kits',
      subcategories: ['Starter Kits', 'Festival Gifts', 'Corporate Gifts', 'Travel Kits']
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Bamboo Toothbrush Set",
      description: "Natural bamboo handles with charcoal bristles",
      price: 299,
      originalPrice: 399,
      rating: 4.5,
      reviews: 128,
      ecoPoints: 50,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400",
      isNew: true,
      category: "personal-care"
    },
    {
      id: 2,
      name: "Reusable Cotton Produce Bags",
      description: "Set of 5 mesh bags for grocery shopping",
      price: 449,
      rating: 4.8,
      reviews: 256,
      ecoPoints: 75,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      isNew: false,
      category: "home-living"
    },
    {
      id: 3,
      name: "Natural Loofah Sponge",
      description: "100% organic and biodegradable loofah",
      price: 199,
      rating: 4.3,
      reviews: 89,
      ecoPoints: 30,
      image: "https://images.unsplash.com/photo-1594736797933-d0c6e4d6d6c4?w=400",
      isNew: true,
      category: "personal-care"
    },
    {
      id: 4,
      name: "Stainless Steel Straws Kit",
      description: "Set of 4 straws with cleaning brush",
      price: 349,
      originalPrice: 499,
      rating: 4.7,
      reviews: 312,
      ecoPoints: 60,
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
      isNew: false,
      category: "home-living"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Update active category based on slide
    setActiveCategory(slides[index].category);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    // Find slide index for this category
    const slideIndex = slides.findIndex(slide => slide.category === categoryId);
    if (slideIndex !== -1) {
      setCurrentSlide(slideIndex);
    }
  };

  // Filter featured products by active category
  const filteredProducts = activeCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory);

  return (
    <div className="home">
      {/* Hero Slider */}
      <section className="hero-slider">
        <div className="slides-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-overlay">
                <div className="slide-content">
                  <h2 className="text-appear">{slide.title}</h2>
                  <p>{slide.description}</p>
                  <Link to={`/category/${slide.category}`} className="btn-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button className="slide-nav slide-prev" onClick={prevSlide}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slide-nav slide-next" onClick={nextSlide}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Slide indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slide-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Shop Categories Navigation - Using YOUR original categories */}
      <section className="shop-categories">
        <div className="container">
          <nav className="categories-nav">
            <button
              className={`category-nav-item ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-nav-item ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Sustainability Guide */}
      <section className="sustainability-guide">
        <div className="container">
          <Link to="/sustainability-guide">
            <i className="fas fa-book"></i>
            Sustainability Guide
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* Category Subcategories */}
      <section className="category-subcategories">
        <div className="container">
          {categories
            .filter(cat => cat.id === activeCategory)
            .map(category => (
              <div key={category.id} className="subcategories-container">
                <h3>Shop {category.name}</h3>
                <div className="subcategories-grid">
                  {category.subcategories.map((sub, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.id}/${sub.toLowerCase().replace(/ /g, '-')}`}
                      className="subcategory-card"
                    >
                      <div className="subcategory-icon">
                        <i className={`fas fa-${getSubcategoryIcon(sub)}`}></i>
                      </div>
                      <span>{sub}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2 className="section-title">
            {activeCategory === 'all' ? 'Featured Products' : `Featured in ${categories.find(c => c.id === activeCategory)?.name}`}
          </h2>
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
          <div className="text-center">
            <Link to={`/category/${activeCategory}`} className="btn-secondary">
              View All {activeCategory === 'all' ? 'Products' : categories.find(c => c.id === activeCategory)?.name}
            </Link>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <div className="chat-widget">
        <button className="chat-button">
          <i className="fas fa-comment"></i>
        </button>
      </div>

      {/* Eco Points Banner */}
      <section className="eco-points-banner">
        <div className="container">
          <div className="banner-content">
            <div className="banner-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="banner-text">
              <h2>Earn Eco Points with Every Purchase</h2>
              <p>
                Collect points and redeem them for discounts on future orders.
                Every purchase makes a difference!
              </p>
            </div>
            <div className="banner-points">
              <div className="points-value">100 Points = ₹50 Off</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Gaiaa?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>100% Eco-Friendly</h3>
              <p>All products are sustainable and biodegradable</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Carbon Neutral Shipping</h3>
              <p>We offset carbon emissions from all deliveries</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-recycle"></i>
              </div>
              <h3>Plastic-Free Packaging</h3>
              <p>All items shipped in compostable materials</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Supports NGOs</h3>
              <p>5% of profits donated to environmental causes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper function for subcategory icons
function getSubcategoryIcon(subcategory) {
  const icons = {
    'Reusable Kitchen': 'utensils',
    'Bamboo Products': 'leaf',
    'Eco Cleaning': 'broom',
    'Storage': 'box',
    'Soaps': 'soap',
    'Hair Care': 'spray-can',
    'Skin Care': 'spa',
    'Oral Care': 'tooth',
    'Organic Clothing': 'tshirt',
    'Eco Bags': 'shopping-bag',
    'Footwear': 'shoe-prints',
    'Accessories': 'gem',
    'Upcycled Items': 'recycle',
    'Starter Kits': 'box-open',
    'Festival Gifts': 'gift',
    'Corporate Gifts': 'briefcase',
    'Travel Kits': 'suitcase'
  };
  
  return icons[subcategory] || 'tag';
}

export default Home;