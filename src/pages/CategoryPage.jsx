import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const CategoryPage = ({ addToCart }) => {
  const { categoryName } = useParams();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Sample products data - you would replace with actual data
  const allProducts = {
    'home-living': [
      { id: 1, name: "Bamboo Cutting Board", price: 899, rating: 4.5, ecoPoints: 60, category: "kitchen", subcategory: "reusable-kitchen" },
      { id: 2, name: "Glass Storage Jars Set", price: 1299, rating: 4.8, ecoPoints: 80, category: "kitchen", subcategory: "storage" },
      { id: 3, name: "Natural Dish Soap", price: 299, rating: 4.3, ecoPoints: 40, category: "cleaning", subcategory: "eco-cleaning" },
      { id: 4, name: "Bamboo Utensil Set", price: 599, rating: 4.6, ecoPoints: 70, category: "kitchen", subcategory: "reusable-kitchen" },
      { id: 5, name: "Cotton Produce Bags", price: 449, rating: 4.7, ecoPoints: 75, category: "kitchen", subcategory: "reusable-kitchen" },
      { id: 6, name: "Beeswax Food Wraps", price: 699, rating: 4.4, ecoPoints: 65, category: "kitchen", subcategory: "reusable-kitchen" },
      { id: 7, name: "Wooden Cleaning Brush", price: 349, rating: 4.2, ecoPoints: 45, category: "cleaning", subcategory: "eco-cleaning" },
    ],
    'personal-care': [
      { id: 8, name: "Charcoal Soap Bar", price: 199, rating: 4.6, ecoPoints: 35, category: "soaps", subcategory: "soaps" },
      { id: 9, name: "Bamboo Hairbrush", price: 499, rating: 4.5, ecoPoints: 60, category: "hair", subcategory: "hair-care" },
      { id: 10, name: "Aloe Vera Face Cream", price: 799, rating: 4.7, ecoPoints: 85, category: "skin", subcategory: "skin-care" },
      { id: 11, name: "Natural Deodorant", price: 349, rating: 4.4, ecoPoints: 50, category: "skin", subcategory: "skin-care" },
      { id: 12, name: "Herbal Shampoo Bar", price: 299, rating: 4.3, ecoPoints: 40, category: "hair", subcategory: "hair-care" },
      { id: 13, name: "Bamboo Cotton Swabs", price: 149, rating: 4.8, ecoPoints: 25, category: "oral", subcategory: "oral-care" },
      { id: 14, name: "Toothpaste Tablets", price: 399, rating: 4.5, ecoPoints: 55, category: "oral", subcategory: "oral-care" },
    ],
    'fashion-accessories': [
      { id: 15, name: "Organic Cotton T-Shirt", price: 899, rating: 4.6, ecoPoints: 100, category: "clothing", subcategory: "organic-clothing" },
      { id: 16, name: "Jute Tote Bag", price: 499, rating: 4.7, ecoPoints: 70, category: "bags", subcategory: "eco-bags" },
      { id: 17, name: "Cork Wallet", price: 699, rating: 4.5, ecoPoints: 80, category: "accessories", subcategory: "accessories" },
      { id: 18, name: "Upcycled Denim Bag", price: 1299, rating: 4.8, ecoPoints: 120, category: "upcycled", subcategory: "upcycled-items" },
      { id: 19, name: "Hemp Sandals", price: 1499, rating: 4.4, ecoPoints: 150, category: "footwear", subcategory: "footwear" },
      { id: 20, name: "Bamboo Sunglasses", price: 999, rating: 4.6, ecoPoints: 90, category: "accessories", subcategory: "accessories" },
      { id: 21, name: "Recycled Polyester Jacket", price: 1999, rating: 4.7, ecoPoints: 180, category: "clothing", subcategory: "organic-clothing" },
    ],
    'gifts-zero-waste-kits': [
      { id: 22, name: "Zero Waste Starter Kit", price: 2499, rating: 4.8, ecoPoints: 200, category: "kits", subcategory: "starter-kits" },
      { id: 23, name: "Eco-Friendly Gift Hamper", price: 1899, rating: 4.7, ecoPoints: 150, category: "gifts", subcategory: "festival-gifts" },
      { id: 24, name: "Corporate Gift Set", price: 3499, rating: 4.9, ecoPoints: 250, category: "gifts", subcategory: "corporate-gifts" },
      { id: 25, name: "Travel Eco Kit", price: 1799, rating: 4.6, ecoPoints: 140, category: "kits", subcategory: "travel-kits" },
      { id: 26, name: "DIY Compost Kit", price: 999, rating: 4.5, ecoPoints: 100, category: "kits", subcategory: "starter-kits" },
      { id: 27, name: "Festival Gift Box", price: 1599, rating: 4.7, ecoPoints: 130, category: "gifts", subcategory: "festival-gifts" },
      { id: 28, name: "Office Zero Waste Kit", price: 2999, rating: 4.8, ecoPoints: 220, category: "gifts", subcategory: "corporate-gifts" },
    ]
  };

  const subcategories = {
    'home-living': ['All', 'Reusable Kitchen', 'Bamboo Products', 'Eco Cleaning', 'Storage'],
    'personal-care': ['All', 'Soaps', 'Hair Care', 'Skin Care', 'Oral Care'],
    'fashion-accessories': ['All', 'Organic Clothing', 'Eco Bags', 'Footwear', 'Accessories', 'Upcycled Items'],
    'gifts-zero-waste-kits': ['All', 'Starter Kits', 'Festival Gifts', 'Corporate Gifts', 'Travel Kits']
  };

  const products = allProducts[categoryName] || [];

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.subcategory === filter.toLowerCase().replace(' ', '-');
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesFilter && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'points': return b.ecoPoints - a.ecoPoints;
      default: return 0;
    }
  });

  return (
    <div className="category-page">
      <div className="container">
        <div className="category-header">
          <h1 className="category-title">
            {categoryName.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </h1>
          <p className="category-description">
            Discover eco-friendly {categoryName.replace('-', ' ')} products for sustainable living
          </p>
        </div>

        <div className="category-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filter-section">
              <h3>Subcategories</h3>
              <div className="subcategory-filters">
                {subcategories[categoryName]?.map(sub => (
                  <button
                    key={sub}
                    className={`subcategory-btn ${filter === sub.toLowerCase().replace(' ', '-') ? 'active' : ''}`}
                    onClick={() => setFilter(sub === 'All' ? 'all' : sub.toLowerCase().replace(' ', '-'))}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-slider">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="slider"
                />
                <div className="price-values">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3>Eco Points</h3>
              <div className="points-filter">
                <button className="points-btn">50+ Points</button>
                <button className="points-btn">100+ Points</button>
                <button className="points-btn">150+ Points</button>
              </div>
            </div>

            <div className="filter-section">
              <h3>Certifications</h3>
              <div className="certification-filters">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Organic Certified</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Fair Trade</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Vegan</span>
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Biodegradable</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-main">
            <div className="products-header">
              <div className="products-count">
                {sortedProducts.length} Products Found
              </div>
              <div className="sort-options">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="points">Most Eco Points</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    description: "Eco-friendly and sustainable product",
                    image: `https://images.unsplash.com/photo-${1500000000000 + product.id}?w=400`,
                    isNew: Math.random() > 0.5
                  }}
                  addToCart={addToCart}
                />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="no-products">
                <i className="fas fa-leaf"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;