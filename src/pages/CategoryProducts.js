import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { products } from "../data/MultipleProductData"; // ✅ named import

const sizeMap = {
  men: ["XS", "S", "M", "L", "XL", "XXL"],
  women: ["XS", "S", "M", "L", "XL", "XXL"],
  "women-footwear": ["34", "35", "36", "37", "38", "39", "40"],
  "men-footwear": ["34", "35", "36", "37", "38", "39", "40"],
};

const CategoryProducts = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { category } = useParams();
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category?.toLowerCase() === category?.toLowerCase()
    );
    setProductsList(filtered);
  }, [category]);

  const handleBuyNow = (product) => {
    const availableSizes = sizeMap[product.category?.toLowerCase()];
    let selectedSize = null;

    if (availableSizes) {
      selectedSize = prompt(
        `Select size for ${product.title || product.name}\nAvailable: ${availableSizes.join(", ")}`
      );
      if (!selectedSize || !availableSizes.includes(selectedSize)) {
        alert("Invalid or no size selected – not buying.");
        return;
      }
    }

    addToCart(selectedSize ? { ...product, selectedSize } : product);
    navigate("/cart"); // Redirect to cart page
  };

  return (
    <div>
      <h1>Products in {category.replace("-", " ")}</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} onBuy={handleBuyNow} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
