import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import styled from "styled-components";  
import Draggable from "react-draggable";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../Config";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: black;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const LeftSideContainer = styled.div`
  flex: 1;
  padding: 20px;
  position: relative;
  width: 300px;
  height: 400px;
  border: 2px dashed #aaa;
`;

const LeftSide = styled.div`
  position: absolute;
`;

const RightSide = styled.div`
  flex: 1;
  padding: 20px;
`;

// DraggableImage component with position reset
const DraggableImage = ({ src, alt, price }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleStop = () => {
    setPosition({ x: 0, y: 0 }); // Reset position to initial state
  };

  return (
    <Draggable
      bounds="parent" // Restrict dragging within the parent element (LeftSide)
      onStop={handleStop}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "200px",
          height: "100px",
          cursor: "move",
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
      />
    </Draggable>
  );
};

const DroppableArea = styled.div`
  width: 400px;
  height: 400px;
  border: 2px dashed #aaa;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: flex-end;
`;

const OrderButton = styled.button`
  align-self: center;
  margin-top: 20px;
`;
const ResetButton = styled.button`
  align-self: center;
  margin-top: 20px;
`;
const UndoButton = styled.button`
  align-self: center;
  margin-top: 20px;
`;
const Price = styled.div`
  align-self: center;
  margin-top: 20px;
  color: white;
`;

// Main component
const Burgger = () => {
  const [stackOrder, setStackOrder] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  // Function to handle ordering
  const handleOrder = async() => {
    console.log("Current stack order:", stackOrder);
    toast.error("Limit Reached");
      // Check if droppedItems contains image URLs
      if (droppedItems.length === 0) {
        toast.error('No images to save');
        return;
      }
    
      try {
        const response = await fetch(`${BASE_URL}/api/v1/Customize/burgerImageOrder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order: droppedItems, // Assuming droppedItems contains the image URLs
            
          }),
        });
    
        if (response.ok) {
          // Handle successful response
          toast.success('Image order saved successfully');
        } else {
          // Handle error response
          toast.error('Failed to save image order');
        }
      } catch (error) {
        console.error('Error saving image order:', error);
        toast.error('Failed to save image order');
      }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (droppedItems.length >= 7) {
        toast.success("Top added as default, Limit Reached!", {
        autoClose: 5000
      });
      if (droppedItems.length >= 8) {
        toast.error("Limit Reached");
        return;
      }
      setDroppedItems((prevItems) => [...prevItems, { src: "/images/8.png", price: 8 }]);
      return;
    }
    const droppedData = e.dataTransfer.getData("text");
    setDroppedItems((prevItems) => [...prevItems, { src: droppedData, price: parseInt(droppedData.match(/\d+/)[0]) }]);
    setUndoStack((prevStack) => [...prevStack, { src: droppedData, price: parseInt(droppedData.match(/\d+/)[0]) }]);
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setDroppedItems([]);
    setUndoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastDroppedItem = undoStack.pop(); // Remove the last dropped item
      setDroppedItems((prevItems) =>
        prevItems.filter((item) => item.src !== lastDroppedItem.src)
      );
      setUndoStack([...undoStack]); // Update the undo stack
    }
  };

  // Calculate total price based on the dropped items
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    droppedItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };
  const calculateTotalPriceWithDiscount = () => {
    const totalPrice = calculateTotalPrice();
    if (totalPrice <= 1) {
      return 1; // Return 1 if total price is less than or equal to 1
    } else if (totalPrice < 5000) {
      return 299; // Price if total is less than 5000
    } else if (totalPrice >= 5000 && totalPrice < 10000) {
      return 499; // Price if total is between 5000 and 10000
    } else if (totalPrice >= 10000 && totalPrice < 15000) {
      return 599; // Price if total is between 10000 and 15000
    } else {
      return 699; // Price if total is above 15000
    }
  };
  return (
    <Layout>
      <Container>
        <TopContainer>
          <LeftSideContainer>
            <LeftSide>
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <DraggableImage
                  key={index}
                  src={`/images/${index}.png`}
                  alt={`Image ${index}`}
                  price={index} // Manually assigning price here
                />
              ))}
            </LeftSide>
          </LeftSideContainer>
          <RightSide>
            <DroppableArea onDrop={handleDrop} onDragOver={allowDrop}>
              {droppedItems.length <= 0 && (
                setDroppedItems((prevItems) => [...prevItems, { src: "/images/1.png", price: 1 }])
              )}
              {stackOrder.map((item, index) => (
                <DraggableImage
                  src={item.src}
                  key={index}
                  alt={`Image ${index}`}
                  price={item.price}
                />
              ))}
              {droppedItems.map((item, index) => (
                <DraggableImage
                  src={item.src}
                  key={index}
                  alt={`Image ${index}`}
                  price={item.price}
                />
              ))}
            </DroppableArea>
            
          </RightSide>
          
        </TopContainer>
        
        <div>
        <Price>Total Price:  ₹{calculateTotalPrice()}</Price>
            Discount Price:  ₹{calculateTotalPriceWithDiscount()}
            <br></br>
          <ResetButton onClick={handleReset}>Reset</ResetButton> {"   "} 
          <OrderButton onClick={handleOrder}>Order</OrderButton>{"   "}
          <UndoButton onClick={handleUndo}>Undo</UndoButton>{"   "}
        </div>
      </Container>
    </Layout>
  );
};

export default Burgger;
