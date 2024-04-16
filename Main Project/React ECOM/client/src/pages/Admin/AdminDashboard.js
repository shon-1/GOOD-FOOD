import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import styled from "styled-components";
import { BASE_URL } from "../../Config";

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
  flex: 0 0 75%;
`;

const Card = styled.div`
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <Container>
        <Row>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          <Content>
            <Card>
              <h3> Name: {auth?.user?.name}</h3>
              <h3> Email: {auth?.user?.email}</h3>
              <h3> Contact: 9207707172</h3>
            </Card>
          </Content>
        </Row>
      </Container>
    </Layout>
  );
};

export default AdminDashboard;
