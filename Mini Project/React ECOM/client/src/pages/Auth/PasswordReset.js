import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import "../../index.css";

const PasswordReset = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/reset-password",
        { password: password, token }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 100);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    }
  };

  return (
    <div className="form-container" style={{ minHeight: "90vh" }}>
      <form onSubmit={handlePasswordReset}>
        <h2>Password Reset</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}
        <div className="mb-3">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter New Password"
            required
          />
        </div>
        <div className="mb-3">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            placeholder="Confirm Password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
      <Toaster/>
    </div>
  );
};

export default PasswordReset;
