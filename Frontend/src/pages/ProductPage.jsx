import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductPage.css';
import API from '../api';

const ProductPage = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const [productRes, allProductsRes] = await Promise.all([
          API.get(`/api/products/${productId}`),
          API.get("/api/products")
        ]);
        
        setProduct(productRes.data);
        
        // Filter out current product and pick first 3 as related
        const related = allProductsRes.data
          .filter(p => p.id.toString() !== productId)
          .slice(0, 3);
        setRelatedProducts(related);
        
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  if (loading) return <div className="container" style={{ padding: '100px 0' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '100px 0' }}>Product not found</div>;

  const images = product.images || [product.image];
  const variants = product.variants || [{ name: 'Default', price: product.price }];
  const features = product.features || [];
  const rating = product.rating || 0;
  const reviews = product.reviews || 0;

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: variants[selectedVariant]?.price || product.price,
      variant: variants[selectedVariant]?.name || 'Default'
    });
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to={`/category/${product.categorySlug || product.category || 'all'}`}>
            {product.category || 'All Products'}
          </Link> / 
          <span>{product.name}</span>
        </div>

        <div className="product-main">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={images[selectedImage]} alt={product.name} />
            </div>
            {images.length > 1 && (
              <div className="thumbnail-images">
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-review">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(rating) ? 'filled' : ''}`}></i>
                ))}
                <span className="rating-value">{rating}</span>
              </div>
              <span className="review-count">({reviews} reviews)</span>
              <span className="in-stock">In Stock</span>
            </div>

            <div className="product-price">
              <span className="current-price">₹{variants[selectedVariant]?.price || product.price}</span>
              {product.originalPrice && (
                <span className="original-price">₹{product.originalPrice}</span>
              )}
              <div className="eco-points-badge">
                <i className="fas fa-leaf"></i>
                {product.ecoPoints} Eco Points
              </div>
            </div>

            <p className="product-short-desc">{product.description}</p>

            {/* Variants */}
            {variants.length > 0 && variants[0].name !== 'Default' && (
              <div className="product-variants">
                <h4>Select Option:</h4>
                <div className="variant-options">
                  {variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`variant-option ${selectedVariant === index ? 'active' : ''}`}
                      onClick={() => setSelectedVariant(index)}
                    >
                      {variant.name}
                      <span>₹{variant.price}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-quantity">
              <h4>Quantity:</h4>
              <div className="quantity-selector">
                <button onClick={decreaseQuantity}>
                  <i className="fas fa-minus"></i>
                </button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button 
                className="add-to-cart-btn btn-primary"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-bag"></i>
                Add to Cart
              </button>
              <button className="wishlist-btn">
                <i className="far fa-heart"></i>
                Add to Wishlist
              </button>
            </div>

            {/* Eco Impact */}
            <div className="product-impact">
              <div className="impact-item">
                <i className="fas fa-bottle-water"></i>
                <span>Saves 12 plastic bottles</span>
              </div>
              <div className="impact-item">
                <i className="fas fa-tree"></i>
                <span>Planted 1 bamboo plant</span>
              </div>
              <div className="impact-item">
                <i className="fas fa-truck"></i>
                <span>Carbon neutral shipping</span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="product-meta">
              <div className="meta-item">
                <span>SKU:</span>
                <strong>GAI-BTB-001</strong>
              </div>
              <div className="meta-item">
                <span>Category:</span>
                <strong>Personal Care, Bamboo Products</strong>
              </div>
              <div className="meta-item">
                <span>Share:</span>
                <div className="social-share">
                  <button><i className="fab fa-facebook-f"></i></button>
                  <button><i className="fab fa-twitter"></i></button>
                  <button><i className="fab fa-pinterest-p"></i></button>
                  <button><i className="fab fa-whatsapp"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-details">
          <div className="detail-tabs">
            <button className="tab active">Description</button>
            <button className="tab">Features</button>
            <button className="tab">Specifications</button>
            <button className="tab">Reviews ({reviews})</button>
          </div>

          <div className="tab-content">
            <div className="description-content">
              <h3>Product Description</h3>
              <p>{product.longDescription || product.description}</p>
              
              {features.length > 0 && (
                <>
                  <h4>Key Features:</h4>
                  <ul className="features-list">
                    {features.map((feature, index) => (
                      <li key={index}>
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2 className="section-title">You May Also Like</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-card">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="related-image">
                    <img src={relatedProduct.image || (relatedProduct.images && relatedProduct.images[0]) || `https://images.unsplash.com/photo-${1500000000000 + relatedProduct.id}?w=300`} 
                         alt={relatedProduct.name} />
                  </div>
                </Link>
                <div className="related-info">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <h4>{relatedProduct.name}</h4>
                  </Link>
                  <div className="related-price">₹{relatedProduct.price || (relatedProduct.variants && relatedProduct.variants[0]?.price)}</div>
                  <div className="related-points">
                    <i className="fas fa-leaf"></i>
                    {relatedProduct.ecoPoints} Points
                  </div>
                  <button className="quick-add-btn" onClick={() => addToCart(relatedProduct)}>Quick Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;