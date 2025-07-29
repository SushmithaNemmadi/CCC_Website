// src/components/ProductCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const sizeMap = {
  men: ["XS", "S", "M", "L", "XL", "XXL"],
  women: ["XS", "S", "M", "L", "XL", "XXL"],
  "women-footwear": ["34", "35", "36", "37", "38", "39", "40"],
  "men-footwear": ["34", "35", "36", "37", "38", "39", "40"],
};

const ProductCard = ({
  product,
  onAddToCart,
  onAddToWishlist,
  onBuy,
  onView,
  onRemove,
  showRemove = false,
  onViewImage,
  disableActions = false,
}) => {
  const navigate = useNavigate();
  const { cartItems, addToCart: contextAddToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const isInCart = cartItems.find((item) => item.id === product.id);
  const isInWishlist = wishlistItems.find((item) => item.id === product.id);

  const handleView = () => {
    if (onView) return onView(product);
    navigate("/view-image", { state: { product } });
  };

  const getSizeIfNeeded = () => {
    const category = product.category?.toLowerCase();
    const availableSizes = sizeMap[category];
    if (availableSizes) {
      const selectedSize = prompt(
        `Select size for ${product.name || product.title}\nAvailable: ${availableSizes.join(", ")}`
      );
      if (!selectedSize || !availableSizes.includes(selectedSize)) {
        alert("Invalid or no size selected – not added.");
        return null;
      }
      return selectedSize;
    }
    return null;
  };

  const handleAddToCart = () => {
    if (onAddToCart) return onAddToCart(product);
    const size = getSizeIfNeeded();
    if (sizeMap[product.category?.toLowerCase()] && !size) return;
    contextAddToCart(size ? { ...product, selectedSize: size } : product);
  };

  const handleAddToWishlist = () => {
    if (onAddToWishlist) return onAddToWishlist(product);
    const size = getSizeIfNeeded();
    if (sizeMap[product.category?.toLowerCase()] && !size) return;
    addToWishlist(size ? { ...product, selectedSize: size } : product);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        width: "300px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <img
        src={product.image}
        alt={product.name || product.title}
        onClick={handleView}
        style={{
          width: "100%",
          height: "220px",
          objectFit: "contain",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      />

      <h3 style={{ margin: "10px 0" }}>{product.title || product.name}</h3>
      <p style={{ fontSize: "14px", color: "#555" }}>{product.description}</p>
      <p style={{ fontWeight: "bold", fontSize: "16px" }}>Price: ₹{product.price}</p>

      {!disableActions && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
          {showRemove ? (
            <button onClick={() => onRemove?.(product)}>🗑️ Remove</button>
          ) : (
            <>
              {!isInCart && (
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🛒 Add to Cart
                </button>
              )}

              {!isInWishlist ? (
                <button
                  onClick={handleAddToWishlist}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "hotpink",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  💖 Add to Wishlist
                </button>
              ) : (
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "#ff6666",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  💔 Remove from Wishlist
                </button>
              )}

              {onBuy && (
                <button
                  onClick={() => onBuy(product)}
                  style={{
                    padding: "8px 12px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ⚡ Buy Now
                </button>
              )}

              <button
                onClick={handleView}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                👁️ View
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
