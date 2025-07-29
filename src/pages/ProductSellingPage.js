// src/pages/ProductSellingPage.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductFromCategory, allProducts } from '../data/MultipleProductData'; // ✅ fixed import
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductSellingPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Decide which products to show
  const products = category
    ? getProductFromCategory(category)
    : allProducts; // ✅ fixed here

  const handleBuy = (product) => {
    navigate('/address', { state: { product } });
  };

  const handleView = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textTransform: 'capitalize', marginBottom: '20px' }}>
        {category ? `${category} Products` : 'All Products'}
      </h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
            onBuy={handleBuy}
            onView={handleView}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSellingPage;
