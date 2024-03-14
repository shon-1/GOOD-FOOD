import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { GrRestaurant } from 'react-icons/gr';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidLogIn } from 'react-icons/bi';
import { useAuth } from "../../context/auth";
import { NavLink,Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import SearchInput from "../Form/Searchinput";
import { Badge } from 'antd'

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const handleLogout = () => {
    localStorage.removeItem('auth');
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
  };

  return (
    <Navbar bg="body-tertiary" expand="lg">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Navbar.Collapse id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <GrRestaurant /> Dream-Dish
          </Link>
         
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/">
              <AiFillHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/RegLog">
              customize
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  <BiSolidLogIn /> Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">

              <NavDropdown.Item  
    as={Link} 
    to={`/Dashboard/${auth?.user?.address === 'worker' ? "DeliveryHome" : 
         (auth?.user?.role === '1' ? "AdminDashboard" : "UserDashboard")}`}
  >
  
               
                  Dashboard

                  
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} as={Link} to="/login">
                  <BiSolidLogIn /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <li className="nav-item">
                <NavLink to="/cart" className="nav-link"  id="cartLink">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                    Cart
                  </Badge>
                </NavLink>
              </li>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;




