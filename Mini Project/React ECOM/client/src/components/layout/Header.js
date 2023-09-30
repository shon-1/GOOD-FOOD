import React from "react";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { GrRestaurant } from 'react-icons/gr';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidLogIn } from 'react-icons/bi';
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const [auth, setAuth] = useAuth();

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
            <GrRestaurant />🥘 Good - food
          </Link>
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/">
              <AiFillHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/RegLog">
              Category
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
    <NavDropdown.Item as={Link} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
      Dashboard
    </NavDropdown.Item>
    <NavDropdown.Item onClick={handleLogout} as={Link} to="/login">
      Logout
    </NavDropdown.Item>
  </NavDropdown>
            )}
            <Nav.Link as={Link} to="/dashboard">
              Cart (0)
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
