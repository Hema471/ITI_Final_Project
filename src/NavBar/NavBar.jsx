import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { logoutUser } from "../rtk/MyFav/userSlice";

const NavBar = () => {
  const myFAv = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div id="Nav_main">
      <Navbar expand="lg">
        <Container className="nav_main">
          <Link className="navbar-brand" to="home">
            <b>MovieVerse</b>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/MyFav" className="nav-link">
                ❤ - {myFAv.length}
              </Link>
              <Link to="Search" className="nav-link">
                Search
              </Link>
            </Nav>
            <Nav>
              {user ? (
                // Display the username and Logout when the user is logged in
                <>
                  <span className="nav-link">Welcome, {user.Username}</span>
                  <Link to="/" className="nav-link" onClick={handleLogout}>
                    Logout
                  </Link>
                </>
              ) : (
                // Display SignUp and Login when the user is not logged in
                <>
                  <Link to="/LogIn" className="nav-link">
                    Login
                  </Link>
                  <Link to="/SignUp" className="nav-link">
                    SignUp
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
