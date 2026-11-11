import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart }) {

  const navigate = useNavigate();

  // REMOVE PRODUCT
  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

      if (item.id === id) {

        return {
          ...item,
          quantity: item.quantity + 1
        };
      }

      return item;
    });

    setCart(updatedCart);
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {

    const updatedCart = cart.map((item) => {

      if (item.id === id && item.quantity > 1) {

        return {
          ...item,
          quantity: item.quantity - 1
        };
      }

      return item;
    });

    setCart(updatedCart);
  };

  // SUBTOTAL
  const subtotal = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  // TAXES 19%
  const taxes = subtotal * 0.19;

  // SHIPPING
  const shipping = subtotal > 0 ? 10 : 0;

  // TOTAL
  const total = subtotal + taxes + shipping;

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "40px"
      }}
    >

      {/* TITLE */}
      <h1
        style={{
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "40px",
          color: "#111827"
        }}
      >
        My Cart
      </h1>

      {/* EMPTY CART */}
      {cart.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "100px"
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Your cart is empty!
          </h2>
        </div>

      ) : (

        <>
          {/* PRODUCTS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px"
            }}
          >

            {cart.map((item) => (

              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "20px",
                  paddingTop: "20px"
                }}
              >

                {/* LEFT SIDE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "15px"
                  }}
                >

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "700"
                    }}
                  >
                    X
                  </button>

                  {/* PRODUCT IMAGE */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "contain",
                      borderRadius: "12px",
                      backgroundColor: "#ffffff",
                      padding: "8px"
                    }}
                  />

                  {/* PRODUCT INFO */}
                  <div>

                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "5px",
                        color: "#111827"
                      }}
                    >
                      {item.name}
                    </h2>

                    <p
                      style={{
                        color: "#6b7280",
                        marginTop: "4px"
                      }}
                    >
                      {Number(item.price).toFixed(2)} TND
                    </p>

                  </div>

                </div>

                {/* RIGHT SIDE */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                  }}
                >

                  {/* QUANTITY */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "999px",
                      padding: "10px 20px",
                      backgroundColor: "white"
                    }}
                  >

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "#2563eb",
                        fontWeight: "700"
                      }}
                    >
                      -
                    </button>

                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#111827"
                      }}
                    >
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "22px",
                        cursor: "pointer",
                        color: "#2563eb",
                        fontWeight: "700"
                      }}
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* TOTAL SECTION */}
          <div
            style={{
              marginTop: "80px",
              maxWidth: "400px",
              marginLeft: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              fontSize: "20px"
            }}
          >

            {/* SUBTOTAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "10px"
              }}
            >
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} TND</span>
            </div>

            {/* TAXES */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "10px"
              }}
            >
              <span>Taxes (19%)</span>
              <span>{taxes.toFixed(2)} TND</span>
            </div>

            {/* SHIPPING */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "10px"
              }}
            >
              <span>Shipping</span>
              <span>{shipping.toFixed(2)} TND</span>
            </div>

            {/* TOTAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "10px",
                fontWeight: "bold",
                fontSize: "28px",
                color: "#111827"
              }}
            >
              <span>Total</span>
              <span>{total.toFixed(2)} TND</span>
            </div>

            {/* BUY BUTTON */}
            <button
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "18px",
                borderRadius: "999px",
                border: "none",
                fontSize: "22px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Buy
            </button>

          </div>
        </>

      )}

    </div>
  );
}

export default Cart;