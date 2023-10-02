import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">

        <div className="list-group dashboard-menu">
          <NavLink to="/Dashboard/AdminDashboard"><h4>Admin Panel</h4></NavLink>

          <NavLink
            to="/Dashboard/AdminDashboard/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/Dashboard/AdminDashboard/create-product"
            className="list-group-item list-group-item-action"
          >
            Create Product
          </NavLink>
          {/* <NavLink
            to="Dashboard/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="Dashboard/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink> */}
          <NavLink
            to="/Dashboard/AdminDashboard/Users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div >
    </>
  );
};

export default AdminMenu;
