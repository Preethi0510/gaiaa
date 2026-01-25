import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-left">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your sustainable shopping journey</p>
            
            <div className="eco-benefits">
              <div className="eco-benefit">
                <i className="fas fa-leaf"></i>
                <div>
                  <h4>Track Your Eco Impact</h4>
                  <p>See how much plastic you've saved</p>
                </div>
              </div>
              <div className="eco-benefit">
                <i className="fas fa-gift"></i>
                <div>
                  <h4>Exclusive Rewards</h4>
                  <p>Special discounts for loyal customers</p>
                </div>
              </div>
              <div className="eco-benefit">
                <i className="fas fa-history"></i>
                <div>
                  <h4>Order History</h4>
                  <p>Quick reorder of your favorite products</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="login-right">
            <div className="login-card">
              <h2>Sign In</h2>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                </div>
                
                <button type="submit" className="login-btn btn-primary">
                  Sign In
                </button>
              </form>
              
              <div className="divider">
                <span>or continue with</span>
              </div>
              
              <div className="social-login">
                <button className="social-btn google-btn">
                  <i className="fab fa-google"></i>
                  Google
                </button>
                <button className="social-btn facebook-btn">
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </div>
              
              <p className="signup-link">
                New to Gaiaa? <Link to="/signup">Create an account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;