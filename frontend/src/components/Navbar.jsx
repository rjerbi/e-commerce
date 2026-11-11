import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

function Navbar() {

  return (

    <>
      <nav
        style={{
          background: "#111",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}
        >
          <FaShoppingCart
            size={24}
            color="white"
          />
          <h1
            style={{
              color: "white",
              fontSize: "20px",
              margin: 0
            }}
          >
            Tunixo
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px"
          }}
        >

          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Home
          </Link>

          <Link
            to="/cart"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Cart
          </Link>

          <Link
            to="/contact"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Contact
          </Link>

          {/* ADMIN LOGIN BUTTON */}
          <Link
            to="/admin"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center"
            }}
          >
            <FaUserCircle
              size={35}
              color="white"
            />
          </Link>

        </div>

      </nav>
    </>
  );
}

export default Navbar;