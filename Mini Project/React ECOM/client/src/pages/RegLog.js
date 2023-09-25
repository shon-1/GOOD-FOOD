import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import './RegLog.css';

const RegLog = () => {
  useEffect(() => {
    // Function to handle the signup button click
    const handleSignupClick = () => {
      slider.classList.add('moveslider');
      formSection.classList.add('form-section-move');
    };

    // Function to handle the login button click
    const handleLoginClick = () => {
      slider.classList.remove('moveslider');
      formSection.classList.remove('form-section-move');
    };

    // Get references to the elements
    const signup = document.querySelector('.signup');
    const login = document.querySelector('.login');
    const slider = document.querySelector('.slider');
    const formSection = document.querySelector('.form-section');

    // Add click event listeners
    signup.addEventListener('click', handleSignupClick);
    login.addEventListener('click', handleLoginClick);

    // Cleanup event listeners when the component unmounts
    return () => {
      signup.removeEventListener('click', handleSignupClick);
      login.removeEventListener('click', handleLoginClick);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <Layout>
      <div className="container">
        {/* upper button section to select the login or signup form */}
        <div className="slider" />
        <div className="btn">
          <button className="login">Login</button>
          <button className="signup">Signup</button>
        </div>
        {/* Form section that contains the login and the signup form */}
        <div className="form-section">
          {/* login form */}
          <div className="login-box">
            <input type="email" className="email ele" placeholder="youremail@email.com" />
            <input type="password" className="password ele" placeholder="password" />
            <button className="clkbtn">Login</button>
          </div>
          {/* signup form */}
          <div className="signup-box">
            <input type="text" className="name ele" placeholder="Enter your name" />
            <input type="email" className="email ele" placeholder="youremail@email.com" />
            <input type="password" className="password ele" placeholder="password" />
            <input type="password" className="password ele" placeholder="Confirm password" />
            <button className="clkbtn">Signup</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegLog;
