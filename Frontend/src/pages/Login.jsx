import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = ({ showToast }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError) {
      showToast("Please use lowercase only for the email address.", "error");
      return;
    }
    // Handle login logic here
    console.log('Login attempt:', formData);
    showToast(`Welcome back! Logging you in...`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'email') {
      if (/[A-Z]/.test(value)) {
        setEmailError('Email must be in lowercase only');
      } else {
        setEmailError('');
      }
    }

    setFormData({
      ...formData,
      [name]: value
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
                    className={emailError ? 'error-input' : ''}
                    required
                  />
                  {emailError && <span className="error-message">{emailError}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
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