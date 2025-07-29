// src/pages/WishlistPage.js
import React, { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
  const { wishlistItems } = useWishlist();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleViewImage = (product) => {
    setSelectedImage(product.image);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ padding: "20px", paddingTop: "80px" }}>
      <h2 style={{ marginBottom: "20px" }}>💖 My Wishlist</h2>

      {/* Full Image Modal */}
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
            alt="Full Product"
            style={{
              maxHeight: "80%",
              maxWidth: "80%",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleViewImage}
              onAddToCart={handleAddToCart}
              // ❌ no need for addToWishlist again
              showRemove={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
