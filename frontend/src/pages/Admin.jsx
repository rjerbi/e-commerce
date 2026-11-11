import { useState } from "react";
import { adminApi } from "../api";
import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await adminApi.post(
        "/admin/login",
        formData
      );

      if (res.data.success) {

        alert("Login Successful");

        // REDIRECT TO DASHBOARD
        navigate("/dashboard");

      } else {

        alert("Wrong Email or Password");
      }

    } catch (error) {

      console.log(error);

      alert("Server Error");
    }
  };

  return (

    <div style={styles.container}>

      <form onSubmit={handleLogin} style={styles.form}>

        <h1 style={styles.title}>Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Login
        </button>

      </form>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9fafb"
  },
  form: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    width: "400px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#111827",
    fontSize: "24px",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    boxSizing: "border-box",
    color: "#111827"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease"
  }
};

export default Admin;