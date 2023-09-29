import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GrRestaurant } from 'react-icons/gr';
import { AiFillHome } from 'react-icons/ai';
import { BiSolidLogIn } from 'react-icons/bi';
import { useAuth } from "../../context/auth";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('auth')

    setAuth({
      ...auth,
      user: null,
      token: "",
      //localStorage:removeItem('token'),

    });

  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GrRestaurant />🥘 Good - food

            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  <AiFillHome /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/RegLog" className="nav-link">
                  Category
                </NavLink>
              </li>

              {
                !auth.user ? (

                  <>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Login" className="nav-link">
                        <BiSolidLogIn /> Login
                      </NavLink>
                    </li>
                  </>

                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink onClick={handleLogout} to="/Login" className="nav-link">
                        <BiSolidLogIn /> Logout
                      </NavLink>
                    </li>

                  </>
                )

              }
              <li className="nav-item">
                <NavLink to="/dashboard" className="nav-link">
                  Cart (0)
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
