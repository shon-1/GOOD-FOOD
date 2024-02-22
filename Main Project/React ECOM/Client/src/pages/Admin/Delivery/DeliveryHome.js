import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import Layout from "../../../components/layout/Layout";
import { useAuth } from "../../../context/auth";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Sidebar = styled.div`
  flex: 0 0 25%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  justify-content: center;
`;
const Card2 = styled.div`
  padding: 1rem;
  background-color: blue;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
  justify-content: center;
  display: flex;
  align-items: center;
 
  background-image: linear-gradient(-225deg, #231557 0%, #44107a 29%, #ff1361 67%, #fff800 100%);
  background-size: auto auto;
  background-clip: border-box;
  background-size: 50% auto;
  color: #fff;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: glow 1s infinite alternate;
  font-size: 50px;

  @keyframes glow {
    to {
      background-position: 200% center;
    }
  }
`;

const ClickableCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ClickableCard = styled(Link)`
  flex: 0 0 calc(50% - 10px);
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const DeliveryHome = () => {
  const [auth] = useAuth();
  const [totalDelivery, setTotalDelivery] = useState(0);

  useEffect(() => {
    const fetchTotalDelivery = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/Delivery/Count/${auth?.user?._id}`);
        setTotalDelivery(response.data.count);
      } catch (error) {
        console.error("Error fetching total delivery count:", error);
      }
    };

    if (auth?.user?._id) {
      fetchTotalDelivery();
    }
  }, [auth]);

  return (
    <Layout>
      <Container>
        <Row>
          <Content>
            <Card>
              <h3> Name: {auth?.user?.name}</h3>
              <h3> Email: {auth?.user?.email}</h3>
              <h3> Contact: 9207707172</h3>
            </Card>
            <Card2>
              Total Delivery: {totalDelivery}
            </Card2>
          </Content>
        </Row>
        <Row>
          <Content>
            <ClickableCardContainer>
              <ClickableCard to="/Dashboard/Myorders">
                <Image src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgfYZByJTexqnzH-U91NMFB_sKOFVfVpF2tyAbCMaljZx7Uqio0RkqRSLBeiuTPolZrpg&usqp=CAU"} alt="Add Delivery Boy" />
                <p>My Orders</p>
              </ClickableCard>

              <ClickableCard to="/Dashboard/DeliveryOrders/">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTykRluRd9oqnkz1LEPcW6RVEahrCdT3GT5flcFzpO9fd8xVmJ7OD2gvZyuh6Dn6KiJQ6M&usqp=CAU" alt="View Delivery Boys" />
                <p>All orders</p>
              </ClickableCard>
            </ClickableCardContainer>
          </Content>
        </Row>
      </Container>
    </Layout>
  );
};

export default DeliveryHome;
