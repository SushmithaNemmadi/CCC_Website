// src/context/CartContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // 🛒 CART FUNCTIONS

  // Add product to cart (no duplicates)
  const addToCart = (item) => {
    if (!cartItems.find((i) => i.id === item.id)) {
      setCartItems([...cartItems, item]);
    }
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // View cart items (optional)
  const viewCart = () => cartItems;

  // 💖 WISHLIST FUNCTIONS

  // Add product to wishlist (no duplicates)
  const addToWishlist = (item) => {
    if (!wishlistItems.find((i) => i.id === item.id)) {
      setWishlistItems([...wishlistItems, item]);
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  // View wishlist items (optional)
  const viewWishlist = () => wishlistItems;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        viewCart,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        viewWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
