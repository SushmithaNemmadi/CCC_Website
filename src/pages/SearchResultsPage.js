// src/pages/SearchResultsPage.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import categoriesData from "../data/categoriesData";
import { products } from "../data/MultipleProductData";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

const sizeMap = {
  men: ["XS", "S", "M", "L", "XL", "XXL"],
  women: ["XS", "S", "M", "L", "XL", "XXL"],
  "men-footwear": ["34", "35", "36", "37", "38", "39", "40"],
  "women-footwear": ["34", "35", "36", "37", "38", "39", "40"],
};

const useQuery = () => new URLSearchParams(useLocation().search);

function SearchResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const searchTerm = query.get("query")?.toLowerCase() || "";

  const { addToCart: contextAddToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const getSizeIfNeeded = (product) => {
    const category = product.category?.toLowerCase();
    const availableSizes = sizeMap[category];
    if (availableSizes) {
      const size = prompt(`Select size (${availableSizes.join(", ")})`);
      if (!size || !availableSizes.includes(size)) {
        alert("Invalid or no size selected. Product not added.");
        return null;
      }
      return size;
    }
    return null;
  };

  const addToCart = (product) => {
    const size = getSizeIfNeeded(product);
    if (sizeMap[product.category?.toLowerCase()] && !size) return;
    contextAddToCart(size ? { ...product, selectedSize: size } : product);
  };

  const addToWishlistHandler = (product) => {
    const size = getSizeIfNeeded(product);
    if (sizeMap[product.category?.toLowerCase()] && !size) return;
    addToWishlist(size ? { ...product, selectedSize: size } : product);
    alert("Product added to wishlist!");
  };

  const handleView = (product) => {
    navigate("/view-image", { state: { product } });
  };

  const searchResultsFromState = location.state?.results;
  const categoryProducts = Object.values(categoriesData).flat();
  const multipleProducts = Object.values(products).flat();
  const allProducts = [...categoryProducts, ...multipleProducts];

  const finalResults =
    searchResultsFromState && searchResultsFromState.length > 0
      ? searchResultsFromState
      : allProducts.filter(
          (product) =>
            (product.title && product.title.toLowerCase().includes(searchTerm)) ||
            (product.name && product.name.toLowerCase().includes(searchTerm)) ||
            (product.description && product.description.toLowerCase().includes(searchTerm)) ||
            (product.category && product.category.toLowerCase().includes(searchTerm))
        );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for "{searchTerm}"</h2>
      {finalResults.length > 0 ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {finalResults.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              onView={() => handleView(product)}
              onAddToCart={() => addToCart(product)}
              onAddToWishlist={() => addToWishlistHandler(product)}
            />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No matching products found.
        </p>
      )}
    </div>
  );
}

export default SearchResultsPage;
