import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import styled from "styled-components";
import { useAuth } from "../../../context/auth";

const { Option } = Select;

const Container = styled.div`
  padding: 3rem;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 900px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 30px;
`;

const OrderCard = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  background-color: #f9f9f9;
`;

const TableCell = styled.td`
  padding: 15px;
`;

const SelectStatus = styled(Select)`
  width: 100%;
`;

const ProductList = styled.div`
  margin-top: 20px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  flex: 1;
`;

const DeliveryOnly = () => {
  const [statusOptions] = useState([
    "Not Processed",
    "Processing",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Accessing authentication context
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth?.user?._id; // Accessing the logged-in user's ID
        const response = await axios.get(`http://localhost:8080/api/v1/Delivery/Onlyorders/${userId}`);
        if (response.data && response.data.orders) {
          setOrders(response.data.orders);
        } else {
          console.error("Invalid response format: missing orders array");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [auth?.user]); // Include auth.user in the dependency array

  const handleChangeStatus = async (orderId, value) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: value } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>Your Orders</Header>
        {orders.map((order) => (
          <OrderCard key={order._id}>
            <OrderTable>
              <tbody>
                <TableRow>
                  <TableCell>Status:</TableCell>
                  <TableCell>
                    <SelectStatus
                      onChange={(value) => handleChangeStatus(order._id, value)}
                      value={order.status}
                    >
                      {statusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </SelectStatus>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Buyer:</TableCell>
                  <TableCell>{order.buyer.name}</TableCell>
                </TableRow>
                 <TableRow>
                  <TableCell>Phone:</TableCell>
                  <TableCell>{order.buyer.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address:</TableCell>
                  <TableCell>{order.buyer.address}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Date:</TableCell>
                  <TableCell>{moment(order.createAt).fromNow()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Payment:</TableCell>
                  <TableCell>{order.payment.success ? "Success" : "Success"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Quantity:</TableCell>
                  <TableCell>{order.products.length}</TableCell>
                </TableRow>
               
              </tbody>
            </OrderTable>
            <ProductList>
              {order.products.map((product) => (
                <ProductItem key={product._id}>
                  <ProductImage src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} />
                  <ProductDetails>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </ProductDetails>
                </ProductItem>
              ))}
            </ProductList>
          </OrderCard>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default DeliveryOnly;
