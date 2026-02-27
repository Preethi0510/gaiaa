import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import API from '../api';

const Signup = ({ showToast }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    newsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailError) {
      showToast("Please use lowercase only for the email address.", "error");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords don't match!", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      showToast("Account created successfully!");
      navigate('/login');
    } catch (error) {
      console.error("Signup error:", error);
      showToast(error.response?.data?.message || "Signup failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'email') {
      if (/[A-Z]/.test(value)) {
        setEmailError('Email must be in lowercase only');
      } else {
        setEmailError('');
      }
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="signup-container">
          <div className="signup-left">
            <h1>Join Gaiaa</h1>
            <p className="subtitle">Start your sustainable living journey today</p>

            <div className="signup-benefits">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Welcome Bonus</h3>
                <p>Get 100 Eco Points + 20% off on first purchase</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Track Impact</h3>
                <p>Monitor your carbon footprint reduction</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>Join Community</h3>
                <p>Connect with fellow eco-conscious shoppers</p>
              </div>
            </div>
          </div>

          <div className="signup-right">
            <div className="signup-card">
              <h2>Create Account</h2>

              <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create password"
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

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
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
                </div>

                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="terms"
                      required
                    />
                    <span>I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                    />
                    <span>Subscribe to newsletter for eco tips & offers</span>
                  </label>
                </div>

                <button type="submit" className="signup-btn btn-primary">
                  Create Account
                </button>
              </form>

              <div className="divider">
                <span>or sign up with</span>
              </div>

              <div className="social-signup">
                <button className="social-btn google-btn">
                  <i className="fab fa-google"></i>
                  Google
                </button>
                <button className="social-btn facebook-btn">
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
              </div>

              <p className="login-link">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;