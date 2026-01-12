import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => 
    sum + (item.price * (quantities[item.id] || 1)), 0
  );
  
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-cart-content">
            <i className="fas fa-shopping-bag"></i>
            <h2>Your Cart is Empty</h2>
            <p>Add some eco-friendly products to your cart</p>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Your Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">{item.description}</p>
                  
                  <div className="item-meta">
                    <div className="eco-points">
                      <i className="fas fa-leaf"></i>
                      <span>{item.ecoPoints} Eco Points</span>
                    </div>
                    <div className="item-rating">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < item.rating ? 'filled' : ''}`}></i>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="item-quantity">
                  <button onClick={() => updateQuantity(item.id, -1)}>
                    <i className="fas fa-minus"></i>
                  </button>
                  <span>{quantities[item.id] || 1}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
                
                <div className="item-price">
                  <div className="current-price">₹{item.price * (quantities[item.id] || 1)}</div>
                  {item.originalPrice && (
                    <div className="original-price">₹{item.originalPrice * (quantities[item.id] || 1)}</div>
                  )}
                </div>
                
                <button 
                  className="remove-item"
                  onClick={() => removeItem(item.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="summary-row eco-points-earned">
                <span>Eco Points Earned</span>
                <span>
                  {cart.reduce((sum, item) => 
                    sum + (item.ecoPoints * (quantities[item.id] || 1)), 0
                  )} Points
                </span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              
              <div className="discount-code">
                <input type="text" placeholder="Discount Code" />
                <button className="apply-btn">Apply</button>
              </div>
              
              <button className="checkout-btn btn-primary">
                Proceed to Checkout
              </button>
              
              <div className="continue-shopping">
                <Link to="/">
                  <i className="fas fa-arrow-left"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            <div className="eco-impact">
              <h3>Your Eco Impact</h3>
              <div className="impact-stats">
                <div className="impact-stat">
                  <i className="fas fa-bottle-water"></i>
                  <span>Saved 24 plastic bottles</span>
                </div>
                <div className="impact-stat">
                  <i className="fas fa-tree"></i>
                  <span>Planted 3 trees</span>
                </div>
                <div className="impact-stat">
                  <i className="fas fa-car"></i>
                  <span>Offset 15km of car emissions</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;