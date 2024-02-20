import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";


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




const DeliveryAdd = () => {


  return (
    <Layout>
      <Container>
        <Dashboard>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          <MainContent>
            <Header>Delivery Management</Header>
           
          </MainContent>
        </Dashboard>
      </Container>
    </Layout>
  );
};

export default DeliveryAdd;
