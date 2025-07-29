import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CategoriesPage from './pages/CategoriesPage';
import MultipleProductPage from './pages/MultipleProductPage';
import ProductSellingPage from './pages/ProductSellingPage';
import AddressPage from './pages/AddressPage';
import ImageViewPage from './pages/ImageViewPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProfilePage from './pages/ProfilePage'; // ✅ Added profile page

import { WishlistProvider } from './context/WishlistContext'; // ✅ Wishlist context

// Route protection component
const PrivateRoute = ({ element, isAuthenticated }) => {
  const location = useLocation();
  return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
};

// Main App Wrapper
const AppWrapper = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();
  const hideNavbarOnLoginOrRegister = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNavbarOnLoginOrRegister && (
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
      <div className={!hideNavbarOnLoginOrRegister ? 'page-container p-4' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cartPage" element={<PrivateRoute element={<CartPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/products" element={<PrivateRoute element={<CategoriesPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/products/:category" element={<PrivateRoute element={<MultipleProductPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/products/:category/:product" element={<PrivateRoute element={<ProductSellingPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/address" element={<PrivateRoute element={<AddressPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/view-image" element={<PrivateRoute element={<ImageViewPage />} isAuthenticated={isAuthenticated} />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} isAuthenticated={isAuthenticated} />} /> {/* ✅ New profile route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

// Final App with authentication and wishlist context
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setCheckingAuth(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/verifyToken', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        if (data.logout) localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Token check failed:', err);
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (checkingAuth) return <div className="p-20 text-center">Checking authentication...</div>;

  return (
    <WishlistProvider>
      <AppWrapper
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </WishlistProvider>
  );
};

export default App;
