// src/test/NavigationTest.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationTest = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Navigation Test Links</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Link to="/category/care">Care Category</Link>
        <Link to="/category/home-living">Home & Living Category</Link>
        <Link to="/category/fashion">Fashion Category</Link>
        <Link to="/category/food">Food Category</Link>
        <Link to="/">Back to Home</Link>
      </div>
    </div>
  );
};

export default NavigationTest;