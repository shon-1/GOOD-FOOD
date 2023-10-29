import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "./../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
  padding: 3rem;
  background-color: #f0f0f0;
`;

const ProductContainer = styled.div`
  display: flex;
  flex: 0 0 75%;
  flex-wrap: wrap;
`;

const ProductCard = styled(Link)`
  text-decoration: none;
  margin: 0.5rem;
  color: #333;
  width: 18rem;
  
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductTitle = styled.h5`
  font-size: 1.25rem;
  margin: 0;
`;

const ProductDescription = styled.p`
  margin: 0;
`;

const Dashboard = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  flex: 0 0 25%;
`;


  


const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
     <Container>
      <Dashboard>
        <Sidebar>
          <AdminMenu />
        </Sidebar>
        
          <ProductContainer>
            {products?.map((p) => (
              <ProductCard key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                <div className="card">
                  <ProductImage
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <ProductInfo>
                    <ProductTitle>{p.name}</ProductTitle>
                    <ProductDescription>{p.description}</ProductDescription>
                  </ProductInfo>
                </div>
              </ProductCard>
            ))}
          </ProductContainer>
       
      </Dashboard>
      </Container>
    </Layout>
  );
};

export default Products;
