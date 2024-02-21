import { renderMatches } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/Login";
import RegLog from "./pages/Auth/RegLog";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Router/Private";
import AdminRoute from "./components/Router/AdminRoute"
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import Userdashboard from "./pages/user/Userdashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import PasswordReset from "./pages/Auth/PasswordReset";
import Cart from "./pages/CartPage";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import Delivery  from "./pages/Admin/Delivery.js";
import DeliveryAdd from "./pages/Admin/DeliveryAdd.js";
import DeliveryView from "./pages/Admin/DeliveryView.js";
import DeliveryOrders from "./pages/Admin/DeliveryOrders.js";

// Routes like container
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:slug" element={<ProductDetails/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/cart" element={<CartPage/>}/>

        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="Userdashboard" element={<Userdashboard />} />
          <Route path="Userdashboard/Orders" element={<Orders />} />
          <Route path="Userdashboard/Profile" element={<Profile />} />
        </Route>

        <Route path="/Dashboard" element={<AdminRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />          
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="Users" element={<Users />} />
          <Route path="Products" element={<Products/>}/>
          <Route path="Orders" element={<AdminOrders/>}/>
          <Route path="Delivery" element={<Delivery/>}/>
          <Route path="Delivery/add-delivery-boy" element={<DeliveryAdd/>}/>
          <Route path="Delivery/view-delivery-boys" element={<DeliveryView/>}/>
          <Route path="DeliveryOrders" element={<DeliveryOrders/>}/> 
        </Route>


        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/reset-password/:token" element={<PasswordReset />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/RegLog" element={<RegLog />} />
        

      </Routes>
    </>
  );
}

export default App;
