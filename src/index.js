// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>
);
