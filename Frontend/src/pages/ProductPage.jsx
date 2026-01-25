import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = ({ addToCart }) => {
  const { productId } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // Sample product data - in real app, fetch based on productId
  const product = {
    id: parseInt(productId) || 1,
    name: "Bamboo Toothbrush Set",
    description: "These natural bamboo toothbrushes feature soft charcoal-infused bristles that gently clean teeth while being kind to the environment. The bamboo handle is 100% biodegradable and sustainably sourced.",
    longDescription: "Our Bamboo Toothbrush Set is crafted with care for both your oral hygiene and the planet. Each brush is made from Moso bamboo, one of the fastest-growing plants on Earth. The bristles are infused with activated charcoal for natural whitening. When it's time to replace your brush, simply compost the handle!",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviews: 128,
    ecoPoints: 50,
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600",
      "https://images.unsplash.com/photo-1564420228450-d1c41fa7b5d9?w=600"
    ],
    variants: [
      { name: "Set of 2", price: 299 },
      { name: "Set of 4", price: 549 },
      { name: "Set of 6", price: 799 }
    ],
    features: [
      "100% biodegradable bamboo handle",
      "Charcoal-infused bristles for natural whitening",
      "BPA-free and vegan",
      "Compostable packaging",
      "Sustainably sourced materials"
    ],
    specifications: {
      material: "Moso Bamboo & Nylon-4 bristles",
      dimensions: "18cm length",
      weight: "15g per brush",
      packaging: "Compostable cardboard box",
      origin: "Made in India"
    }
  };

  const relatedProducts = [
    { id: 5, name: "Bamboo Cotton Swabs", price: 149, rating: 4.8, ecoPoints: 25 },
    { id: 6, name: "Natural Loofah", price: 199, rating: 4.3, ecoPoints: 30 },
    { id: 7, name: "Silk Dental Floss", price: 249, rating: 4.6, ecoPoints: 40 }
  ];

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart({
      ...product,
      price: product.variants[selectedVariant].price,
      variant: product.variants[selectedVariant].name
    });
  };

  return (
    <div className="product-page">
      <div className="container">
        <div className="product-breadcrumb">
          <Link to="/">Home</Link> / 
          <Link to="/category/home-living">Home & Living</Link> / 
          <Link to="/category/home-living/personal-care">Personal Care</Link> / 
          <span>{product.name}</span>
        </div>

        <div className="product-main">
          {/* Product Images */}
          <div className="product-images">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <div className="thumbnail-images">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating-review">
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}></i>
                ))}
                <span className="rating-value">{product.rating}</span>
              </div>
              <span className="review-count">({product.reviews} reviews)</span>
              <span className="in-stock">In Stock</span>
            </div>

            <div className="product-price">
              <span className="current-price">₹{product.variants[selectedVariant].price}</span>
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
            <div className="product-variants">
              <h4>Select Option:</h4>
              <div className="variant-options">
                {product.variants.map((variant, index) => (
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
            <button className="tab">Reviews ({product.reviews})</button>
          </div>

          <div className="tab-content">
            <div className="description-content">
              <h3>Product Description</h3>
              <p>{product.longDescription}</p>
              
              <h4>Key Features:</h4>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <i className="fas fa-check"></i>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="related-products">
          <h2 className="section-title">You May Also Like</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-card">
                <div className="related-image">
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + relatedProduct.id}?w=300`} 
                       alt={relatedProduct.name} />
                </div>
                <div className="related-info">
                  <h4>{relatedProduct.name}</h4>
                  <div className="related-price">₹{relatedProduct.price}</div>
                  <div className="related-points">
                    <i className="fas fa-leaf"></i>
                    {relatedProduct.ecoPoints} Points
                  </div>
                  <button className="quick-add-btn">Quick Add</button>
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