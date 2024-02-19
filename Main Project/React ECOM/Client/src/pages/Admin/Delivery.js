import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Define styled components if necessary
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

const Card = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px 8px 0 0;
  object-fit: cover;
`;

const CardText = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
`;

const Delivery = () => {
  // Handle click events for the cards
  const handleAddDeliveryBoyClick = () => {
    // Handle add delivery boy click
    console.log("Add Delivery Boy clicked");
  };

  const handleViewDeliveryBoyClick = () => {
    // Handle view delivery boy click
    console.log("View Delivery Boy clicked");
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link to="/Dashboard/Delivery/add-delivery-boy">
                <Card onClick={handleAddDeliveryBoyClick}>
                  <CardImage src={"https://visualpharm.com/assets/691/Add%20User%20Male-595b40b65ba036ed117d3b1f.svg"} alt="Add Delivery Boy" />
                 
                  <CardText>Add Delivery Boy</CardText>
                </Card>
              </Link>
              <div style={{ width: "200px" }} /> 
              <Link to="/Dashboard/Delivery/view-delivery-boys">
                <Card onClick={handleViewDeliveryBoyClick}>
                  <CardImage src="https://icon-library.com/images/people-search-icon/people-search-icon-6.jpg" alt="View Delivery Boys" />
                  <CardText>View Delivery Boys</CardText>
                </Card>
              </Link>
            </div>
          </MainContent>
        </Dashboard>
      </Container>
    </Layout>
  );
};

export default Delivery;
