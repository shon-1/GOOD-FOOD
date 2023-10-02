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

// Routes like container
function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="Userdashboard" element={<Userdashboard />} />
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/Dashboard" element={<AdminRoute />}>
          <Route path="AdminDashboard" element={<AdminDashboard />} />
          <Route path="AdminDashboard/create-category" element={<CreateCategory />} />
          <Route path="AdminDashboard/create-product" element={<CreateProduct />} />
          <Route path="AdminDashboard/Users" element={<Users />} />

        </Route>


        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/RegLog" element={<RegLog />} />

      </Routes>
    </>
  );
}

export default App;
