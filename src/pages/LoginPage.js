// src/pages/LoginPage.js

import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { checkToken } from "../services/auth";
import "../styles/FormStyles.css"; // ✅ Added styles

function LoginPage({ setIsAuthenticated }) {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const phone = event.target.phone.value;
    const password = event.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, password }),
      });

      const data = await response.json();

      if (response.status === 401) {
        alert("Unauthorized access. Please check your credentials.");
        return;
      }

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          const isValid = await checkToken(data.token);
          if (isValid) {
            setIsAuthenticated(true);
            navigate("/");
          } else {
            alert("Invalid token received. Please try again.");
          }
        }

        if (data.userData) {
          localStorage.setItem("user", JSON.stringify(data.userData));
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  }

  return (
    <div className="page-background">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="phone" placeholder="Phone Number" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p style={{ marginTop: "10px" }}>
          Don't have an account?{" "}
          <NavLink to="/register" style={{ color: "#007bff" }}>
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
