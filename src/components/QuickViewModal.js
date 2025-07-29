import React from 'react';
import './QuickViewModal.css'; // Optional styling

const QuickViewModal = ({ product, onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>₹{product.price}</p>
      </div>
    </div>
  );
};

export default QuickViewModal;
