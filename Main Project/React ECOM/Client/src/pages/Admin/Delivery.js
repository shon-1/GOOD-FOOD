import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Define styled components if necessary
const Container = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
`;

const Dashboard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Sidebar = styled.div`
  flex: 0 0 25%;
`;

const Delivery = () => {
  // Define your state variables and any other necessary logic here
  // For example:
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("your-api-endpoint");
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data: ", error);
  //     toast.error("Failed to fetch data.");
  //   }
  // };

  return (
    <Layout>
      <Container>
        <Dashboard>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          {/* Other components or content can go here */}
        </Dashboard>
      </Container>
    </Layout>
  );
};

export default Delivery;
