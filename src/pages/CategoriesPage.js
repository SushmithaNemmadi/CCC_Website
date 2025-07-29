// src/pages/CategoriesPage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categoriesData from '../data/categoriesData'; // original object-based format
import '../pages/CategoriesPage.css'; // optional, style accordingly

function CategoriesPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Convert categoriesData object to array of { name, image }
    const data = Object.keys(categoriesData).map((key) => ({
      name: key,
      image: categoriesData[key][0]?.image || '',
    }));
    setCategories(data);
  }, []);

  return (
    <div className="categories-container">
      <h1 className="categories-title">Explore Our Categories</h1>
      <div className="categories-grid">
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <img src={cat.image} alt={cat.name} className="category-image" />
            <h2 className="category-name">{cat.name.replace('-', ' ')}</h2>
            <button
              className="category-button"
              onClick={() => navigate(`/products/${cat.name}`)}
            >
              View Products
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
