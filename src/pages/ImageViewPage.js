// src/pages/ImageViewPage.js
import { useLocation, useNavigate } from "react-router-dom";

const ImageViewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>Product not found.</p>;
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px' }}>
      <h2>{product.name || product.title}</h2>
      
      <img
        src={product.image}
        alt={product.name || product.title}
        style={{
          width: '80%',
          maxWidth: '600px',
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          cursor: 'zoom-in',
        }}
        onClick={() => window.open(product.image, '_blank')}
      />

      <p style={{ marginTop: '20px', fontSize: '18px' }}>
        Price: ₹{product.price}
      </p>

      {product.description && (
        <p style={{ maxWidth: '600px', margin: '10px auto', color: '#555' }}>
          {product.description}
        </p>
      )}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          border: 'none',
          backgroundColor: '#eee',
          cursor: 'pointer',
          borderRadius: '6px'
        }}
      >
        ⬅️ Back
      </button>
    </div>
  );
};

export default ImageViewPage;
