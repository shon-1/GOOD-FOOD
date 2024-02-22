import React, { useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

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

const Form = styled.form`
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: calc(100% - 90px); /* Adjust the width as needed */
  padding: 10px;
  border: 1px solid ${({ error }) => (error ? "red" : "green")};
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DeliveryAdd = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState("");

  const handleGeneratePassword = () => {
    const randomPassword = generateRandomPassword();
    setPassword(randomPassword)
    
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Email validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }



    try {
      const res = await axios.post("http://localhost:8080/api/v1/Delivery/register", {
        name,
        email,
        password,
        phone,
        address:"worker",
        answer: answer !== null ? answer : "null",
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          //navigate("/login");
        }, 100);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    return newPassword;
  };

  return (
    <Layout>
      <Container>
        <Dashboard>
          <Sidebar>
            <AdminMenu />
          </Sidebar>
          <MainContent>
            <Header>Add Delivery Guy</Header>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Name:</Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!name && error}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!email && error}
                />
              </FormGroup>
              <FormGroup>
                <Label>Phone:</Label>
                <Input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  error={!phone && error}
                />
              </FormGroup>
              <FormGroup>
                <Label>Address:</Label>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  error={!address && error}
                />
              </FormGroup>
              <FormGroup>
                <FieldContainer>
                  <Label>Password:</Label>
                  
                  <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!password && error}
                  />
                  <Button type="button" onClick={handleGeneratePassword}>Generate</Button>
                </FieldContainer>
              </FormGroup>
              {error && <ErrorMessage>{error}</ErrorMessage>}  
              
              <Button type="submit">Add Delivery Guy</Button>
            </Form>
          </MainContent>
        </Dashboard>
      </Container>
    </Layout>
  );
};

export default DeliveryAdd;
