// src/pages/MultipleProductPage.js
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  products as allProducts,
  getProductFromCategory,
} from "../data/MultipleProductData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "../pages/productpage.css";

const MultipleProductPage = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ For navigation

  const [productsToShow, setProductsToShow] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";

  useEffect(() => {
    if (searchTerm) {
      const filtered = allProducts.filter((product) => {
        const name = product.name.toLowerCase();
        const cat = product.category.toLowerCase();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || cat.includes(term);
      });
      setProductsToShow(filtered);
    } else if (category) {
      const categoryProducts = getProductFromCategory(category);
      setProductsToShow(categoryProducts);
    } else {
      setProductsToShow(allProducts);
    }
  }, [category, searchTerm]);

  const handleViewImage = (product) => {
    setSelectedImage(product.image);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (product) => {
    const wasAdded = addToWishlist(product);
    if (wasAdded) {
      alert(`Wishlist ${product.name} added to wishlist.`);
    } else {
      alert(`${product.name} is already in wishlist.`);
    }
  };

  const handleBuyNow = (product) => {
    navigate("/address", { state: { product } }); // ✅ Navigate to address with product
  };

  return (
    <div className="product-container">
      <h1 className="product-title">
        {searchTerm
          ? `Search results for "${searchTerm}"`
          : category
          ? `Category: ${category}`
          : "All Products"}
      </h1>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={selectedImage}
            alt="Product View"
            style={{ maxHeight: "80%", maxWidth: "80%", borderRadius: "8px" }}
          />
        </div>
      )}

      <div className="product-grid">
        {productsToShow.length > 0 ? (
          productsToShow.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onClick={() => handleViewImage(product)}
              />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-price">₹{product.price}</p>
              <div className="product-buttons">
                <button
                  className="product-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="product-button buy"
                  onClick={() => handleBuyNow(product)} // ✅ Use updated handler
                >
                  Buy Now
                </button>
                <button
                  className="product-button wishlist"
                  onClick={() => handleAddToWishlist(product)}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default MultipleProductPage;
