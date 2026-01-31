import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CategoryPage.css';

// Components
import ProductCard from '../components/ProductCard/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import Pagination from '../components/Pagination/Pagination';
import FilterSidebar from '../components/FilterSidebar/FilterSidebar';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';

const CategoryPage = () => {
  const { categoryId, categoryName } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 12;
  
  // Filter state
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'featured',
    inStockOnly: false,
    selectedBrands: [],
    selectedRatings: []
  });
  
  // Category info state
  const [categoryInfo, setCategoryInfo] = useState({
    name: '',
    description: '',
    image: ''
  });

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // Fetch category details
        const categoryResponse = await axios.get(
          `/api/categories/${categoryId || categoryName}`
        );
        setCategoryInfo(categoryResponse.data);
        
        // Fetch products with filters
        await fetchProducts();
      } catch (err) {
        setError('Failed to load category data');
        console.error('Error fetching category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId, categoryName]);

  // Fetch products with current filters
  const fetchProducts = async () => {
    try {
      const params = {
        page: currentPage,
        limit: productsPerPage,
        ...filters,
        category: categoryId || categoryName
      };

      const response = await axios.get('/api/products', { params });
      
      setProducts(response.data.products);
      setTotalProducts(response.data.totalCount);
      setTotalPages(Math.ceil(response.data.totalCount / productsPerPage));
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 1000,
      sortBy: 'featured',
      inStockOnly: false,
      selectedBrands: [],
      selectedRatings: []
    });
    setCurrentPage(1);
  };

  // Handle product click
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="category-page loading">
        <LoadingSpinner />
        <p>Loading category...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="category-page error">
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  // No products found
  if (products.length === 0 && !loading) {
    return (
      <div className="category-page empty">
        <h2>No Products Found</h2>
        <p>No products available in this category with the current filters.</p>
        <button 
          onClick={clearAllFilters}
          className="clear-filters-button"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Categories', path: '/categories' },
          { label: categoryInfo.name, path: null }
        ]}
      />

      {/* Category Header */}
      <header className="category-header">
        <div className="category-header-content">
          <h1 className="category-title">{categoryInfo.name}</h1>
          {categoryInfo.description && (
            <p className="category-description">{categoryInfo.description}</p>
          )}
          <div className="category-meta">
            <span className="product-count">
              {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'}
            </span>
          </div>
        </div>
        
        {categoryInfo.image && (
          <div className="category-hero">
            <img 
              src={categoryInfo.image} 
              alt={categoryInfo.name}
              className="category-hero-image"
            />
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <div className="category-content">
        {/* Sidebar Filters */}
        <aside className="category-sidebar">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
          />
        </aside>

        {/* Products Section */}
        <main className="category-main">
          {/* Toolbar with sort options */}
          <div className="products-toolbar">
            <div className="toolbar-left">
              <h3>Products</h3>
              <span className="showing-products">
                Showing {(currentPage - 1) * productsPerPage + 1} - 
                {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts}
              </span>
            </div>
            
            <div className="toolbar-right">
              <div className="sort-container">
                <label htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
              
              <button 
                onClick={() => setCurrentPage(1)}
                className="refresh-button"
                title="Refresh products"
              >
                ↻
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
                className="product-card-item"
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="products-pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {/* Category Description (optional bottom section) */}
          {categoryInfo.longDescription && (
            <div className="category-long-description">
              <h3>About {categoryInfo.name}</h3>
              <div dangerouslySetInnerHTML={{ __html: categoryInfo.longDescription }} />
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Button (hidden on desktop) */}
      <button className="mobile-filter-button">
        <span>☰ Filters</span>
        <span className="filter-count">
          {Object.values(filters).filter(f => Array.isArray(f) ? f.length > 0 : f).length}
        </span>
      </button>
    </div>
  );
};

// PropTypes for type checking (if using PropTypes)
CategoryPage.propTypes = {
  // Add prop types if this component receives props
};

export default CategoryPage;