// src/components/DebugLinks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DebugLinks = () => {
  const categories = ['Care', 'Home & Living', 'Fashion', 'Food'];
  
  const getCategoryPath = (name) => {
    const slug = name.toLowerCase()
      .replace(/ & /g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
    return `/category/${slug}`;
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '100px', 
      right: '20px', 
      background: 'white', 
      padding: '20px', 
      borderRadius: '10px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000 
    }}>
      <h4 style={{ marginBottom: '10px' }}>Debug Links</h4>
      {categories.map((cat) => {
        const path = getCategoryPath(cat);
        return (
          <div key={cat} style={{ marginBottom: '8px' }}>
            <Link to={path} style={{ color: '#36656B', textDecoration: 'none' }}>
              {cat} → {path}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DebugLinks;