import React from 'react';
import './PhotoGrid.css';

const PhotoGrid = ({ subcategory, images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="photo-grid-section">
      <h3 className="photo-grid-title">{subcategory} Collection</h3>
      <div className="photo-grid">
        {images.slice(0, 6).map((image, index) => (
          <div key={index} className="photo-grid-item">
            <img 
              src={image} 
              alt={`${subcategory} ${index + 1}`}
              loading="lazy"
            />
            <div className="photo-overlay">
              <span>View Product</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGrid;