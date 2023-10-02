import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout"
import UserMenu from "../../components/layout/UserMenu"
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  // Context
  const [auth, setAuth] = useAuth();

  // State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Get user data from context and populate the state
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    console.log("User data from context:", auth?.user); // Add this console.log
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the user's profile
      const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      console.log("Response from API:", data); // Add this console.log
      if (data?.error) {
        toast.error(data?.error);
      } else {
        // Update the user's data in the context
        setAuth({ ...auth, user: data?.updatedUser });
        console.log("Updated user data in context:", data?.updatedUser); // Add this console.log

        // Update the user's data in localStorage
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        console.log("Updated user data in localStorage:", ls.user); // Add this console.log

        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.error("Error:", error); // Add this console.error
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>
          <div className="col-md-7">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Email "
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Address"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
