// src/context/WishlistContext.js

import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // Load initial wishlist from localStorage or use empty array
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem("wishlistItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add to wishlist (optional: prevent duplicates)
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (!exists) {
        return [...prev, product];
      }
      return prev; // Skip adding if already in wishlist
    });
  };

  // Remove from wishlist by product ID
  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for accessing the wishlist context
export const useWishlist = () => useContext(WishlistContext);
