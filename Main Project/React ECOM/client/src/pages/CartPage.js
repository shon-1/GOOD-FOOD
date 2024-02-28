import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import DropIn from "braintree-web-drop-in-react";
//import { Spinner } from "react-bootstrap";
// eslint-disable-next-line

const CircularJSON = require('circular-json');

const CartPage = () => {
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [instance, setInstance] = useState("");
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [razorpayLoading, setRazorpayLoading] = useState(false);

  // Razorpay Integration
  const handleRazorpayPayment = async () => {
    try {
      setRazorpayLoading(true);
      console.log("F Razorpay request payload:", {
        amount: totalPrice() ,

        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
        })),
       // payment: {
          // Add payment details if needed
       // },
        buyer: {
          userId: auth?.user?._id,  
          // Add other buyer details as needed
        },
      });
      const response = await axios.post("http://localhost:8080/api/v1/payment/orders", {
        amount: cart.reduce((total, item) => total + item.price * item.quantity, 0),

        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          // Add other product details as needed
        })),
     
        buyer: {
          userId: auth?.user?._id,  
          // Add other buyer details as needed
        },
      
       
      });
      console.log(" F Razorpay response:", response);


      const options = {
        key: "rzp_test_wH5PplUikspRy6",
        amount: response.data.amount,
        currency: "INR",
        name: "Dream Dish",
        description: "Payment for Food Items",
        order_id: response.data.id,
        handler: (response) => {
          // Handle the successful payment response
          console.log("F Payment Response",response);
          toast.success("Payment Completed Successfully ");
          localStorage.removeItem("cart");
          setCart([]);
          navigate("/Dashboard/UserDashboard/Orders");
        },
        prefill: {
          name: auth?.user?.name || "",
          email: auth?.user?.email || "",
        },
        theme: {
          color: "#F38255",
        },
        modal: {
          ondismiss: () => {
            setRazorpayLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      setRazorpayLoading(false);
    }
  };

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      // eslint-disable-next-line
    
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });

    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //new braintree
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  // eslint-disable-next-line
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // eslint-disable-next-line
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
       cart
      });

      // Implement server-side logic to confirm payment and update order status

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateQuantity = (pid, newQuantity) => {
    try {
      let updatedCart = cart.map((item) =>
        item._id === pid ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout !"
                  }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 p-4 m-4">
            {cart?.map((p) => (
              <div className="row card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"130px"}
                  />
                </div>
                <div className="col-md-4">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : {p.price}</p>
                  <p>
                  <div className="quantity-controls">
                  <span className="quantity-label">Quantity:</span>
    <button
      style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
      className="quantity-btn"
      onClick={() => updateQuantity(p._id, p.quantity - 1)}
      disabled={p.quantity <= 1}
    >
      -
    </button>
    <span className="quantity">{p.quantity}</span>
    <button
      style={{ fontSize: '0.8rem', padding: '0.2rem 0.5rem' }}
      className="quantity-btn"
      onClick={() => updateQuantity(p._id, p.quantity + 1)}
      disabled={p.quantity >= 5}
    >
      +
    </button>
  </div>
                </p>
                </div>
                <div className="col-md-4 cart-remove-btn">
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5   cart-summary">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/Dashboard/UserDashboard/Profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!auth?.token || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  {/*<button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    //disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>*?}*/}

                  {/* Razorpay Button */}
                  <button
                    className="btn btn-success mt-2"
                    onClick={handleRazorpayPayment}
                    disabled={razorpayLoading || !auth?.user?.address}
                  >
                    {razorpayLoading ? "Processing ...." : "Pay with Razorpay"}
                  </button>

                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
