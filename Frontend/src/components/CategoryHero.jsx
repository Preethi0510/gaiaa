// src/components/CategoryHero.jsx
import React, { useState, useEffect } from 'react';
import './CategoryHero.css';

const CategoryHero = ({ categoryId, subcategories }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Get hero images for this category
  const categoryHeroImages = {
    'home-living': [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&auto=format&fit=crop&q=80"
    ],
    // Add other categories...
  };

  const images = categoryHeroImages[categoryId] || [];

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const getCategoryTitle = (id) => {
    const titles = {
      'home-living': 'Home & Living',
      'personal-care': 'Personal Care',
      'fashion-accessories': 'Fashion & Accessories',
      'gifts-zero-waste-kits': 'Gifts & Zero-Waste Kits'
    };
    return titles[id] || id;
  };

  if (images.length === 0) return null;

  return (
    <section className="category-hero">
      <div className="category-hero-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`category-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="category-slide-overlay">
              <div className="category-slide-content">
                <h2>{getCategoryTitle(categoryId)}</h2>
                <p>Discover our {subcategories.join(', ').toLowerCase()} collections</p>
                <div className="subcategory-tags">
                  {subcategories.map((sub, idx) => (
                    <span key={idx} className="subcategory-tag">
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="category-slide-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`category-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;