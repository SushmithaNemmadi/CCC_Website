//AllRoutes.js


import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from '../pages/Home';
import CartPage from '../pages/CartPage';
import CategoriesPage from '../pages/CategoriesPage';
import MultipleProductPage from '../pages/MultipleProductPage';
import ProductSellingPage from '../pages/ProductSellingPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import WishlistPage from '../pages/WishlistPage';
import AddressPage from '../pages/AddressPage';
import ImageViewPage from '../pages/ImageViewPage';
import SearchResultsPage from '../pages/SearchResultsPage';

const AllRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0); // ✅ Wishlist count state

  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/verifyToken", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        if (data.logout) {
          localStorage.removeItem("token");
        }
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const PrivateRoute = ({ element }) => {
    const location = useLocation();
    return isAuthenticated ? element : <Navigate to="/login" state={{ from: location }} replace />;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={<LoginPage setIsAuthenticated={setIsAuthenticated} checkToken={checkToken} />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/search" element={<SearchResultsPage />} />

      {/* Protected Routes */}
      <Route path="/cartPage" element={<PrivateRoute element={<CartPage />} />} />
      <Route path="/wishlist" element={<PrivateRoute element={<WishlistPage />} />} />
      <Route path="/products" element={<PrivateRoute element={<CategoriesPage />} />} />
      <Route
        path="/products/:category"
        element={<PrivateRoute element={<MultipleProductPage setWishlistCount={setWishlistCount} />} />}
      />
      <Route
        path="/products/:category/:product"
        element={<PrivateRoute element={<ProductSellingPage />} />}
      />
      <Route path="/sell" element={<PrivateRoute element={<ProductSellingPage />} />} />
      <Route path="/address" element={<PrivateRoute element={<AddressPage />} />} />
      <Route path="/view-image" element={<PrivateRoute element={<ImageViewPage />} />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AllRoutes;
