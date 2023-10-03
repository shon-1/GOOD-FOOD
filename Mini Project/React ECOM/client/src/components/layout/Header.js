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
    <Navbar className="custom-navbar" expand="lg"> {/* Apply custom-navbar class */}
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbarTogglerDemo01" />
        <Navbar.Collapse id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand custom-brand"> {/* Apply custom-brand class */}
            <GrRestaurant />🥘 Good - food
          </Link>
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={Link} to="/" className="custom-link"> {/* Apply custom-link class */}
              <AiFillHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/RegLog" className="custom-link"> {/* Apply custom-link class */}
              Category
            </Nav.Link>
            {!auth.user ? (
              <>
                <Nav.Link as={Link} to="/register" className="custom-link"> {/* Apply custom-link class */}
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" className="custom-link"> {/* Apply custom-link class */}
                  <BiSolidLogIn /> Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title={auth?.user?.name} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={`/Dashboard/${auth?.user?.role === '1' ? "AdminDashboard" : "UserDashboard"}`} className="custom-link"> {/* Apply custom-link class */}
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout} as={Link} to="/login" className="custom-link"> {/* Apply custom-link class */}
                  <BiSolidLogIn /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Nav.Link as={Link} to="/Dashboard" className="custom-link cart-link"> {/* Apply custom-link and cart-link classes */}
              Cart <span className="cart-badge">0</span> {/* Apply cart-badge class */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
