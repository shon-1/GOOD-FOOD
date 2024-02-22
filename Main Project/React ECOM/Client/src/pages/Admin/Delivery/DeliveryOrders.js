import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import AdminMenu from "../../../components/layout/AdminMenu";
import Layout from "../../../components/layout/Layout";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { Select } from "antd";
import styled from "styled-components";

const { Option } = Select;

const Container = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  max-width: 800px;
`;

const Header = styled.h1`
  font-size: 24px;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const EditButton = styled.button`
  background-color: rgb(100, 149, 237);
  color: white;
  border-radius: 10px;
  padding: 3px 6px;
  font-size: 12px;
  width: 100px;
  height: 50px;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")}; // Disable pointer events when disabled
  opacity: ${(props) => (props.disabled ? 0.5 : 1)}; // Reduce opacity when disabled
`;

const AnimatedContainer = styled(Container)`
  animation: fadeIn 1s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const DeliveryOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Out for delivery",
    "delivered",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Destructure auth, we don't need to setAuth in this component

  const getOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/Delivery/Allorders"
      );
      if (response.data && response.data.orders) {
        const ordersWithButtonClicked = response.data.orders.map((order) => ({
          ...order,
          buttonClicked: false,
        }));
        setOrders(ordersWithButtonClicked);
      } else {
        console.error("Invalid response format: missing orders array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleButtonClick = async (orderId) => {
    try {
    
      const userId = auth?.user?._id;
     
      const response = await axios.post(
        `http://localhost:8080/api/v1/Delivery/DeliveryAdd/${orderId}`,
        { userId }
      );
    
      console.log(response);
      toast.success(response.data.message ,{
        duration: 4000, // Keep the success message displayed for 4 seconds
      });
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, buttonClicked: true }; // Set buttonClicked to true for the clicked order
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatedContainer>
      <MainContent>
        <Header>Delivery left</Header>

        {orders.map((o, i) => (
          <div className="border shadow mb-3" key={o._id}>
            <Table className="table">
              <thead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Buyer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell> 
                </TableRow>
              </thead>
              <tbody>
                <TableRow>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{o?.buyer?.name}</TableCell>
                  <TableCell>{moment(o?.createAt).fromNow()}</TableCell>
                  <TableCell>
                    {o?.payment.success ? "Success" : "Success"}
                  </TableCell>
                  <TableCell>{o?.products?.length}</TableCell>
                  <TableCell>
                    <EditButton
                      disabled={o.buttonClicked} // Disable button if it's already clicked
                      onClick={() => handleButtonClick(o._id)}
                    >
                      {o.buttonClicked ? "Selected":"Deliver This"}
                    </EditButton>
                  </TableCell>
                </TableRow>
              </tbody>
            </Table>
            <div
              className="container"
              style={{ height: `${o?.products?.length * 145}px` }}
            >
              {o?.products?.map((p, i) => (
                <div className="row mb-2 p-3 card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100px"
                      height={"100px"}
                    />
                  </div>
                  <div className="col-md-8">
                    <p>{p.name}</p>
                    <p>{p.description?.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <Toaster/>
      </MainContent>
    </AnimatedContainer>
   
    
  );
};

export default DeliveryOrders;
