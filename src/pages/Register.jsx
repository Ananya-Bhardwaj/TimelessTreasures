import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Register.css"; // Link the CSS file
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log('Signed up as:', user.email);
        alert("Registration Successful!");
        navigate("/login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="register-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="register-input"
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="register-text">
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;