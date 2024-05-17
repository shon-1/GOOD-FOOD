import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import Search from "./Search";
import SearchInput from "../components/Form/Searchinput";
import { BASE_URL } from "../Config";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    console.log('Updated checked array:', all);
    setChecked(all);
  };
  useEffect(() => {
    console.log('useEffect 1 - checked:', checked);
    console.log('useEffect 1 - radio:', radio);
    if (!checked.length || !radio.length) getAllProducts();
    console.log('Calling getAllProducts');
  }, [checked.length, radio.length]);

  useEffect(() => {
    console.log('useEffect 2 - checked:', checked);
    console.log('useEffect 2 - radio:', radio);
    if (checked.length || radio.length) filterProduct();
    console.log('Calling filterProduct');
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      console.log('Response from API:', data);
      setProducts(data?.products);
    } catch (error) {
      console.log('Error in filterProduct:', error);
      console.log(error);
    }
  };
  return (
    <Layout title={"DreamDish "}>
      {/* banner image */}
      <div class="image-container2">
        <img
          src="https://source.unsplash.com/random/900x200/?burger"
          className="d-block h-100 w-50"
          alt="Burger"
        />
        <img
          src="https://source.unsplash.com/random/900x200/?food"
          className="d-block h-100 w-50"
          alt="pizza"
        />
      </div>
      <div className="fake-container">
        LOading.......

      </div> <div className="fake-container">
        Server Connecting.....!

      </div>
      {/*<div className="search-container">
    <SearchInput />
  </div>*/}
      <div className="search-container">
        <SearchInput />
      </div>

      {/* banner image 
      <div className="center-search-input">
        <SearchInput />
      </div>*/}
      <div className="container-fluid row mt-5 home-page ">
      
        <div className="col-md-2 filters">
        <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center"></h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-3 " key={p._id}>
                <img
                
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>

                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      id="45"
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        // Check if the item is already in the cart
                        const existingItem = cart.find((item) => item._id === p._id);

                        if (existingItem) {
                          // If the item is already in the cart, update its quantity
                          const updatedCart = cart.map((item) =>
                            item._id === p._id ? { ...item, quantity: item.quantity + 1 } : item
                          );
                          setCart(updatedCart);
                        } else {
                          // If the item is not in the cart, add it with quantity 1
                          setCart([...cart, { ...p, quantity: 1 }]);
                        }

                        localStorage.setItem("cart", JSON.stringify(cart));
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
             
              
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;