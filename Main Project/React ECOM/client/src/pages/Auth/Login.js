import React, { useState, useEffect } from "react";
import Layout from '../../components/layout/Layout';
import "../../styles/form.css";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../Config";

const Login = () => {
  console.log("Login component rendered"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setAuth(authData);
      if (authData.user.role === "1") {
        if (authData.user.address === "worker") {
          navigate("/Dashboard/DeliveryHome");
        } else {
          navigate("/Dashboard/AdminDashboard");
        }
      } else {
        navigate("/");
      }
    }
  }, [navigate, setAuth]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email,
        password,
      });

      console.log("API Response:", res.data);

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        console.log("User Role:", res.data.user.role);

        setTimeout(() => {
          if (res.data.user.role === "1") {
            console.log("Before navigating to Admin Dashboard");
            if (res.data.user.address === "worker") {
              console.log("address=worker");
              navigate("/Dashboard/DeliveryHome");
              return;
            }
            navigate(location.state || "/Dashboard/AdminDashboard");
          } else {
            navigate(location.state || "/");
          }
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
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <NavLink to="/forgot-password" className="forgot-link">Forgot Password</NavLink>
          </div>

          <button type="submit" className="btn btn-primary" id="testid">
            LOGIN
          </button>
        </form>
      </div>
      <Toaster/>
    </Layout>
  );
};

export default Login;
