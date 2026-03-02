import React, { useState, useEffect } from 'react';
import API from '../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    subcategory: '',
    ecoPoints: '',
    image: '',
    rating: 4.5,
    reviews: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct.id}`, formData);
      } else {
        await API.post('/products', formData);
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        price: product.price || (product.variants && product.variants[0]?.price) || '',
        description: product.description || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        ecoPoints: product.ecoPoints || '',
        image: product.image || (product.images && product.images[0]) || '',
        rating: product.rating || 4.5,
        reviews: product.reviews || 0
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        subcategory: '',
        ecoPoints: '',
        image: '',
        rating: 4.5,
        reviews: 0
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  if (loading) return <div className="admin-loading">Loading Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button className="btn-primary" onClick={() => openModal()}>
            <i className="fas fa-plus"></i> Add New Product
          </button>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <i className="fas fa-box"></i>
            <div>
              <h3>Total Products</h3>
              <p>{products.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-leaf"></i>
            <div>
              <h3>Eco Impact</h3>
              <p>High</p>
            </div>
          </div>
        </div>

        <div className="products-table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Eco Points</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img 
                      src={product.image || (product.images && product.images[0])} 
                      alt={product.name} 
                      className="admin-product-img" 
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price || (product.variants && product.variants[0]?.price)}</td>
                  <td>{product.ecoPoints}</td>
                  <td className="admin-actions">
                    <button className="edit-btn" onClick={() => openModal(product)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (₹)</label>
                    <input 
                      type="number" 
                      name="price" 
                      value={formData.price} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Eco Points</label>
                    <input 
                      type="number" 
                      name="ecoPoints" 
                      value={formData.ecoPoints} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                      <option value="">Select Category</option>
                      <option value="care">Care</option>
                      <option value="home-living">Home & Living</option>
                      <option value="fashion">Fashion</option>
                      <option value="food">Food</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Subcategory</label>
                    <input 
                      type="text" 
                      name="subcategory" 
                      value={formData.subcategory} 
                      onChange={handleInputChange} 
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
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleInputChange} 
                    rows="3"
                  ></textarea>
                </div>
                <div className="modal-actions">
                  <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="submit-btn btn-primary">
                    {editingProduct ? 'Update Product' : 'Save Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
