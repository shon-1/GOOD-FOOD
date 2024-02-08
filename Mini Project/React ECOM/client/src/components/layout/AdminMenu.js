import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuContainer = styled.div`
  text-align: center;
  max-width: 250px;
  max-height: 10px;
  margin: 10;
`;

const MenuItem = styled(NavLink)`
  display: block;
  padding: 10px 10px;
  text-decoration: none;
  color: #666;
  font-size: 20px;
  transition: all 0.3s; /* Apply transition to all properties */

  &:hover {
    background-color: #99ff99;
    color: #111; /* Change text color on hover */
    transform: scale(1.05); /* Enlarge the text on hover */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a subtle shadow on hover */

    
  }
`;

const AdminMenu = () => {
  return (
    <MenuContainer>
      <MenuItem to="/Dashboard/AdminDashboard" exact>Admin Panel</MenuItem>
      <MenuItem to="/Dashboard/create-category">Create Category</MenuItem>
      <MenuItem to="/Dashboard/create-product">Add Item</MenuItem>
      <MenuItem to="/Dashboard/products">Item</MenuItem>
      <MenuItem to="/Dashboard/orders">Orders</MenuItem>
      {/*<MenuItem to="/Dashboard/Users">Users</MenuItem>*/}
    </MenuContainer>
  );
};

export default AdminMenu;
