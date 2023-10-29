import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/layout/Footer';

const PageNotFound = ({ children }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops! Page Not Found</h2>
        <button onClick={goBack} className="pnf-btn">
          Go Back
        </button>
      </div>
      <main style={{ minHeight: "17vh" }}>{children}</main>
      <Footer />
    </>
  );
};

export default PageNotFound;
