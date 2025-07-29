function CartComponent({ cartItems = [], onAdd, onRemove, onDelete, onView }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((product, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              width: '250px',
              textAlign: 'center',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{product.name}</h3>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
            <p>{product.description}</p>
            <p>
              <strong>₹{product.price}</strong>
            </p>
            <p>Quantity: {product.quantity}</p>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px',
              }}
            >
              <button onClick={() => onAdd(product)}>+</button>
              <button onClick={() => onRemove(product)}>-</button>
              <button
                onClick={() => onDelete(product)}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Remove
              </button>
            </div>
            <button
              onClick={() => onView(product)}
              style={{
                marginTop: '10px',
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              View
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default CartComponent;
