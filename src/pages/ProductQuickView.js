import React from 'react';
import { useParams } from 'react-router-dom';
import { MultipleProductData } from '../data/MultipleProductData';

const ProductQuickView = () => {
  const { id } = useParams();
  const product = MultipleProductData.find(item => item.id === Number(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
      {/* Product Image */}
      {product.image && (
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '300px', height: 'auto', marginBottom: '20px', objectFit: 'cover' }} 
        />
      )}

      {/* Product Name */}
      <h1>{product.name}</h1>

      {/* Product Price */}
      <p><strong>Price:</strong> ₹{product.price}</p>

      {/* Product Description */}
      <p>{product.description}</p>
    </div>
  );
};

export default ProductQuickView;
