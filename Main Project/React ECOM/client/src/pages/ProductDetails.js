import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { BASE_URL } from "../Config";


// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    flex: 1;
  }
`;

const LeftTop = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
`;

const CTop = styled.div`
container:center;
  padding: 20px;
  flex: 1;
`;

const RightTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  margin-top: 200px;
  border: px solid #ddd; /* Add border */
  padding: 05px; /* Add padding */

  @media (min-width: 768px) {
    margin-top: 0;
    flex: 1;
  }
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
`;

const SimilarProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductCard = styled.div`
  flex-basis: calc(50% - 20px);
  margin: 10px;

  @media (min-width: 768px) {
    flex-basis: calc(25% - 20px);
  }
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const MoreDetailsButton = styled(StyledButton)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const Price = styled.span`
  color: #007bff;
`;

const StyledSlider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(
    to right,
    ${props => props.value <= 35 ? '#f00' : props.value <= 80 ? '#0f0' : '#f00'} ${props => props.value}%,
    #ddd ${props => props.value}%);
  outline: none;
  opacity: 0.7;
  transition: background-color 0.3s; /* Add transition for background-color */
  
  &:hover {
    opacity: 3;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${props => props.value <= 35 ? '#ff0' : '#4CAF50'}; /* Change to yellow for values below 35 */
    cursor: pointer;
    transition: background-color 0.3s; /* Add transition for background-color */
  }

  &::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border: 0;
    border-radius: 50%;
    background: ${props => props.value <= 35 ? '#ff0' : '#4CAF50'}; /* Change to yellow for values below 35 */
    cursor: pointer;
    transition: background-color 0.3s; /* Add transition for background-color */
  }
`;

const NoteBox = styled.textarea`
  width: 100%;
  min-height: 100px;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;
const SliderValue = styled.p`
  position: absolute;
  top: -25px; /* Adjust positioning */
  left: calc(${props => props.value}% - 10px); /* Adjust positioning */
`;

// ProductDetails component
const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [saltSliderValue, setSaltSliderValue] = useState(50); // Default value set to 50
  const [spiceSliderValue, setSpiceSliderValue] = useState(50); // Default value set to 50
  const [note, setNote] = useState('');
  const [submittedNote, setSubmittedNote] = useState("");
  const [showRightTop, setShowRightTop] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      // If the item is already in the cart, update its quantity
      const updatedCart = cart.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCart(updatedCart);
    } else {
      // If the item is not in the cart, add it with quantity 1
      setCart([...cart, { ...item, quantity: 1,spiceLevel: spiceSliderValue, saltLevel: saltSliderValue }]);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item Added to cart");
  };

  const handleSubmitNote = () => {
    // Save the note to submittedNote variable
    setSubmittedNote(note);
    // Optionally, you can perform any additional actions here, such as sending the note to a server or clearing the note field
    // Clear the note field after submission
    setNote("");
  };

  return (
    <Layout>
      <Container>
        <TopContainer>
          <LeftTop>
            <h1>Product Details</h1>
            <hr />
            {product && (
              <ProductImage
                src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            )}
            <h6>Name: {product.name}</h6>
            <h6>Description: {product.description}</h6>
            <h6>
              Price: <Price>{product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}</Price>
            </h6>
            <h6>Category: {product?.category?.name}</h6>
            <CTop>
              <StyledButton onClick={() => addToCart(product)}>ADD TO CART</StyledButton>
              <StyledButton onClick={() => setShowRightTop(!showRightTop)}>Customize</StyledButton>
            </CTop>
          </LeftTop>
         

          {showRightTop && (


            <RightTop>

              <h1>Customize</h1>
              <hr />
              <div>
                <h3>Salt Control</h3>
                <StyledSlider
                  id="saltSlider"
                  className="multi-range"
                  type="range"
                  value={saltSliderValue}
                  onChange={(e) => setSaltSliderValue(parseInt(e.target.value))}
                />
                <SliderValue value={saltSliderValue}>{saltSliderValue}</SliderValue>
                <p>{saltSliderValue}</p> {/* Display the slider value */}
                {saltSliderValue >= 80 && <p>Too salty</p>}
                {saltSliderValue <= 35 && <p>Not Recommended</p>}
                {saltSliderValue > 35 && saltSliderValue < 80 && <p>Balanced</p>}
              </div>
              <div>
                <h3>Spice Level</h3>
                <StyledSlider
                  id="spiceSlider"
                  className="multi-range"
                  type="range"
                  value={spiceSliderValue}
                  onChange={(e) => setSpiceSliderValue(parseInt(e.target.value))}
                />
                {spiceSliderValue >= 80 && <p>Too spicy</p>}
                {spiceSliderValue <= 40 && <p>Not Recommended</p>}
                {spiceSliderValue > 40 && spiceSliderValue < 80 && <p>Balanced</p>}
                <p>{spiceSliderValue}</p> {/* Display the slider value */}
                {/* Add spice level messages here */}
              </div>
              Add Note (Message to the Chef):
              <NoteBox
                placeholder="Add notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              {/* Submit button to save note */}
              <StyledButton onClick={handleSubmitNote}>Submit Custom Settings</StyledButton>
            </RightTop>
          )}
        </TopContainer>
        <BottomContainer>
          <h2>Similar Products</h2>
          <hr />
          <SimilarProductsContainer>
            {relatedProducts?.map((p) => (
              <ProductCard key={p._id}>
                <ProductImage
                  src={`${BASE_URL}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <div>
                  <h5>{p.name}</h5>
                  <h5>
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                  <p>{p.description.substring(0, 60)}...</p>
                  <div>
                    <MoreDetailsButton onClick={() => navigate(`/product/${p.slug}`)}>
                      MORE DETAILS
                    </MoreDetailsButton>
                    <StyledButton onClick={() => addToCart(p)}>ADD TO CART</StyledButton>
                  </div>
                </div>
              </ProductCard>
            ))}
          </SimilarProductsContainer>
        </BottomContainer>
      </Container>
    </Layout>
  );
};

export default ProductDetails;
