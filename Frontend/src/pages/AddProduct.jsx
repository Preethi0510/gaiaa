import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './AddProduct.css';

const AddProduct = ({ showToast }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image: '',
    ecoPoints: ''
  });

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Price must be greater than 0";
    if (formData.stock === "" || parseInt(formData.stock) < 0) newErrors.stock = "Stock must be 0 or greater";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await API.post('/products', formData);
      
      showToast("Product added successfully!", "success");
      
      // Clear form
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: '',
        ecoPoints: ''
      });
      
      // Redirect to products page
      navigate('/category/all');
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message || "An error occurred";

      if (status === 400) {
        showToast(`Validation Error: ${message}`, "error");
      } else if (status === 401) {
        // Handled by API interceptor (redirect to login)
      } else if (status === 403) {
        showToast("Admin access required to perform this action", "error");
      } else if (status === 500) {
        showToast("Internal server error. Please try again later.", "error");
      } else {
        showToast(message || "Failed to add product", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page container">
      <div className="form-card">
        <h2>Add New Sustainable Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label>Product Name*</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              className={errors.name ? 'error-input' : ''}
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (₹)*</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange}
                className={errors.price ? 'error-input' : ''}
                placeholder="0.00"
              />
              {errors.price && <span className="error-text">{errors.price}</span>}
            </div>
            <div className="form-group">
              <label>Stock Quantity*</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleInputChange}
                className={errors.stock ? 'error-input' : ''}
                placeholder="0"
              />
              {errors.stock && <span className="error-text">{errors.stock}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange}>
                <option value="">Select Category</option>
                <option value="care">Care</option>
                <option value="home-living">Home & Living</option>
                <option value="fashion">Fashion</option>
                <option value="food">Food</option>
              </select>
            </div>
            <div className="form-group">
              <label>Eco Points</label>
              <input 
                type="number" 
                name="ecoPoints" 
                value={formData.ecoPoints} 
                onChange={handleInputChange}
                placeholder="Points earned"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange}
              className={errors.description ? 'error-input' : ''}
              rows="4"
              placeholder="Describe the product and its sustainability impact"
            ></textarea>
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={() => navigate('/admin/dashboard')}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn btn-primary" 
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
