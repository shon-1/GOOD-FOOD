import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import "../../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const navigate = useNavigate();

  const handleWhitespaceValidation = (value) => {
    // Check for leading whitespace
    if (value.startsWith(" ")) {
      toast.dismiss();
      toast.error("Leading whitespace is not allowed.");
      return false;
    }
    return true;
  };

  const handleNameValidation = (value) => {
    // Check if the value contains only alphabetic characters
    const namePattern = /^[A-Za-z0-9]+$/;
    if (!namePattern.test(value)) {
      toast.dismiss();
      toast.error("Name should contain only alphabetic characters.");
      return false;
    }
    return true;
  };

  const handlePhoneValidation = (value) => {
    // Check if the value contains only numbers
    const phonePattern = /^[0-9]*$/; // Allow an empty string or only numeric characters
    if (!phonePattern.test(value)) {
      toast.dismiss();
      toast.error("Phone number should contain only numbers.");
      return false;
    }
    return true;
  };

  const handlePasswordStrength = (value) => {
    // Check password strength (at least one letter and one number)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (passwordPattern.test(value)) {
      setPasswordStrength("strong");
    } else if (value.length >= 8) {
      setPasswordStrength("moderate");
    } else {
      setPasswordStrength("weak");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !phone || !address) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Whitespace validation
    if (!handleWhitespaceValidation(name)) return;
    if (!handleWhitespaceValidation(email)) return;
    if (!handleWhitespaceValidation(password)) return;
    if (!handleWhitespaceValidation(phone)) return;
    if (!handleWhitespaceValidation(address)) return;

    // Name validation
    if (!handleNameValidation(name)) return;

    // Phone number validation
    if (!handlePhoneValidation(phone)) return;

    // Password strength validation
    if (passwordStrength === "weak") {
      toast.error("Password is too weak.");
      return;
    }

    // Other custom validation rules can be added here

    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 100);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleWhitespaceValidation(e.target.value);
                handleNameValidation(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleWhitespaceValidation(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleWhitespaceValidation(e.target.value);
                handlePasswordStrength(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
            <div className={`password-strength ${passwordStrength}`} />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                handleWhitespaceValidation(e.target.value);
                handlePhoneValidation(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                handleWhitespaceValidation(e.target.value);
              }}
              className="form-control"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
        <Toaster />
      </div>
    </Layout>
  );
};

export default Register;
