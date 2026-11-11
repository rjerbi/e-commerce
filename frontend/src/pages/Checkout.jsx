import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart }) {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: ""
  });

  // HANDLE INPUTS
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBTOTAL
  const subtotal = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  // TAXES
  const taxes = subtotal * 0.19;

  // SHIPPING
  const shipping = subtotal > 0 ? 10 : 0;

  // TOTAL
  const total = subtotal + taxes + shipping;

  // CONFIRM ORDER
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const fullAddress = `${formData.address}, ${formData.city}, ${formData.state}, ${formData.zipCode} | Email: ${formData.email}`;

      await api.post(
        "/orders",
        {
          customer_name:
            formData.name + " " + formData.surname,

          phone: formData.phone,

          address: fullAddress,

          total: total.toFixed(2)
        }
      );

      alert(
        "Your order has been confirmed and it will be shipped in less than 48 hours."
      );

      setCart([]);
      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Error while confirming order");
    }
  };

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
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "40px",
          color: "#111827"
        }}
      >
        Checkout
      </h1>

      {/* MAIN CONTAINER */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "40px"
        }}
      >

        {/* ORDER SUMMARY */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 15px rgba(15,23,42,0.04)"
          }}
        >

          <h2
            style={{
              fontSize: "24px",
              marginBottom: "25px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Order Summary
          </h2>

          {/* PRODUCTS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}
          >

            {cart.map((item) => (

              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #e5e7eb",
                  paddingBottom: "15px"
                }}
              >

                {/* LEFT */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                  }}
                >

                  {/* IMAGE */}
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

                  {/* INFO */}
                  <div>

                    <h3
                      style={{
                        fontSize: "20px",
                        marginBottom: "5px",
                        color: "#111827"
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        color: "#6b7280",
                        marginTop: "4px"
                      }}
                    >
                      Quantity : {item.quantity}
                    </p>

                  </div>

                </div>

                {/* PRICE */}
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#2563eb"
                  }}
                >
                  {(
                    Number(item.price) * item.quantity
                  ).toFixed(2)} TND
                </div>

              </div>

            ))}

          </div>

          {/* TOTALS */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "15px"
            }}
          >

            {/* SUBTOTAL */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                color: "#374151",
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
                fontSize: "18px",
                color: "#374151",
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
                fontSize: "18px",
                color: "#374151",
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
                fontSize: "28px",
                fontWeight: "bold",
                color: "#111827"
              }}
            >
              <span>Total</span>
              <span>{total.toFixed(2)} TND</span>
            </div>

          </div>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "40px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 15px rgba(15,23,42,0.04)"
          }}
        >

          <h2
            style={{
              fontSize: "24px",
              marginBottom: "30px",
              fontWeight: "700",
              color: "#111827"
            }}
          >
            Shipping Information
          </h2>

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px"
            }}
          >

            <input
              type="text"
              name="name"
              placeholder="First Name"
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="surname"
              placeholder="Last Name"
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
              style={inputStyle}
            />

          </div>

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
            style={{
              ...inputStyle,
              width: "100%",
              marginTop: "20px",
              height: "120px",
              resize: "none"
            }}
          />

          {/* CITY / STATE / ZIP */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "20px",
              marginTop: "20px"
            }}
          >

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="text"
              name="zipCode"
              placeholder="ZIP Code"
              onChange={handleChange}
              required
              style={inputStyle}
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "35px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              padding: "18px",
              borderRadius: "14px",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer"
            }}
          >
            Confirm Order
          </button>

        </form>

      </div>

    </div>
  );
}

// INPUT STYLE
const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "17px",
  outline: "none",
  boxSizing: "border-box",
  color: "#111827",
  backgroundColor: "#ffffff"
};

export default Checkout;