import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="welcome-box">
        <h1>Welcome to Our Store!</h1>
        <p>Discover trendy, affordable, and high-quality products at your fingertips!</p>
        <button className="explore-btn" onClick={() => navigate('/products')}>
          Explore Categories
        </button>
      </div>

      <div className="featured-section">
        <h2>✨ Featured Products ✨</h2>
        {/* Add your featured products display here using ProductCard */}
      </div>
    </div>
  );
}

export default Home;
