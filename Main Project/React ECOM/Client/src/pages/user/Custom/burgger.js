import React, { useState } from "react";
import Layout from "../../../components/layout/Layout";
import styled from "styled-components";
import Draggable from "react-draggable";
import toast from "react-hot-toast";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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
const DraggableImage = ({ src, alt }) => {
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


// Main component
const Burgger = () => {
  const [stackOrder, setStackOrder] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  // Function to handle ordering
  const handleOrder = () => {
    console.log("Current stack order:", stackOrder);
    toast.error("Limit Reached");
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
      setDroppedItems((prevItems) => [...prevItems, "/images/8.png"]);
      return;
    }
    const droppedData = e.dataTransfer.getData("text");
    setDroppedItems((prevItems) => [...prevItems, droppedData]);
    setUndoStack((prevStack) => [...prevStack, droppedData]);
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
        prevItems.filter((item) => item !== lastDroppedItem)
      );
      setUndoStack([...undoStack]); // Update the undo stack
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
                />
              ))}
            </LeftSide>
          </LeftSideContainer>
          <RightSide>
            <DroppableArea onDrop={handleDrop} onDragOver={allowDrop}>
              {droppedItems.length <= 0 && (
                setDroppedItems((prevItems) => [...prevItems, "/images/1.png"])
              )}
              {stackOrder.map((image, index) => (
                <DraggableImage
                  src={image}
                  key={index}
                  alt={`Image ${index}`}
                />
              ))}
              {droppedItems.map((item, index) => (
                <DraggableImage
                  src={item}
                  key={index}
                  alt={`Image ${index}`}
                />
              ))}
            </DroppableArea>
          </RightSide>
        </TopContainer>
        <div>
          <ResetButton onClick={handleReset}>Reset</ResetButton> {"   "} 
          <OrderButton onClick={handleOrder}>Order</OrderButton>{"   "}
          <UndoButton onClick={handleUndo}>Undo</UndoButton>{"   "}
        </div>
      </Container>
    </Layout>
  );
};

export default Burgger;
