import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import styled from "styled-components";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../Config";

const Container = styled.div`
  padding: 3rem;
`;

const Dashboard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Sidebar = styled.div`
  flex: 0 0 25%;
`;

const MainContent = styled.div`
  flex: 0 0 75%;
`;

const Header = styled.h1`
  font-size: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const DeliveryView = () => {
  const [deliveryGuys, setDeliveryGuys] = useState([]);

  useEffect(() => {
    const fetchDeliveryGuys = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/Delivery/delivery-guys`);
        setDeliveryGuys(response.data.deliveryGuys);
      } catch (error) {
        console.error("Error fetching delivery guys:", error);
      }
    };

    fetchDeliveryGuys();
  }, []);

  const handleToggleAddress = async (userId, currentAddress) => {
    const newAddress = currentAddress === "worker" ? "not worker" : "worker";
    try {
      await axios.put(`${BASE_URL}/api/v1/Delivery/${userId}/Deli-update-address`, { address: newAddress });
      setDeliveryGuys((prev) =>
        prev.map((guy) =>
          guy._id === userId ? { ...guy, address: newAddress } : guy
      
        )
      );
      toast.success("Updated Successfully");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <Layout>
      <Container>
        <Dashboard>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          <MainContent>
            <Header>Delivery Management</Header>
            <Table>
              <thead>
                <tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Role</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {deliveryGuys.map((guy) => (
                  <tr key={guy._id}>
                    <Td>{guy.name}</Td>
                    <Td>{guy.email}</Td>
                    <Td>{guy.phone}</Td>
                    <Td>{guy.address}</Td>
                    <Td>
                      {guy.address === "worker" ? (
                        <Button
                          onClick={() => handleToggleAddress(guy._id, guy.address)}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleToggleAddress(guy._id, guy.address)}
                        >
                          Enable
                        </Button>
                      )}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </MainContent>
        </Dashboard>
      </Container>
    </Layout>
  );
};

export default DeliveryView;
