import { useState } from 'react';

function ProductCard({ product, addToCart }) {
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (

    <div style={styles.card}>

      {showNotification && (
        <div style={styles.notification}>
          ✓ Product added successfully to your cart!
        </div>
      )}

      <img
        src={product.image}
        alt={product.name}
        style={styles.image}
      />

      <h3 style={styles.title}>
        {product.name}
      </h3>

      <p style={styles.description}>
        {product.description}
      </p>

      <h4 style={styles.price}>
        {Number(product.price).toFixed(2)} TND
      </h4>

      <button
        onClick={handleAddToCart}
        style={styles.button}
      >
        Add To Cart
      </button>

    </div>
  );
}

const styles = {

  card: {
    border: "1px solid #e5e7eb",
    padding: "20px",
    width: "260px",
    borderRadius: "12px",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    transition: "0.3s",
    position: "relative"
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    borderRadius: "8px",
    background: "#ffffff"
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    color: "#111827"
  },

  description: {
    color: "#6b7280",
    fontSize: "14px",
    margin: 0
  },

  price: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    color: "#2563eb"
  },

  button: {
    width: "100%",
    backgroundColor: "#2563eb",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },

  notification: {
    position: "absolute",
    top: "10px",
    left: "10px",
    right: "10px",
    background: "#10b981",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    zIndex: 1000
  }
};

export default ProductCard;