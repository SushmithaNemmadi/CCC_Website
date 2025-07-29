// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const [searchInput, setSearchInput] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchChange = (e) => setSearchInput(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchInput.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">ShopMate</div>

      <div className="navbar-center">
        <Link to="/" className="nav-btn">Home</Link>
        <Link to="/products" className="nav-btn">Products</Link>
        <Link to="/cartPage" className="nav-btn">🛒 Cart ({cartItems.length})</Link>
        <Link to="/wishlist" className="nav-btn">❤️ Wishlist ({wishlistItems.length})</Link>
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search Here"
            value={searchInput}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="user-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle size={28} />
          {dropdownOpen && (
            <div className="dropdown-menu">
              {!isAuthenticated && (
                <>
                  <Link to="/login" onClick={() => setDropdownOpen(false)}>Login</Link>
                  <Link to="/register" onClick={() => setDropdownOpen(false)}>Register</Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <NavLink to="/profile" onClick={() => setDropdownOpen(false)}>
                    My Profile
                  </NavLink>
                  <button onClick={handleLogout}>Logout</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
