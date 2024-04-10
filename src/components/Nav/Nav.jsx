import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { ThemeContext } from '../../components/App/ThemeContext';

function CustomNav() {
  const user = useSelector((store) => store.user);
  // State to manage the theme
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    // Apply the theme class to the body or a specific container
    document.body.className = theme;
  }, [theme]); // This effect runs whenever the theme state changes



  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" className="nav custom-navbar">
      <Navbar.Brand as={Link} to={user.id ? "/user/profile" : "/home"} className="mx-auto custom-navbar-brand">milkcrate.</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/* Place conditional buttons or navigation links here */}
        </Nav>
        <Nav>
          {!user.id ? (
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          ) : (
            <>
              {/* Toggle Theme Button */}
              <Nav.Link as={Link} to="/user/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/social">Social</Nav.Link>
              <Nav.Link as={Link} to="/spins">Spins</Nav.Link>
              <Nav.Link as={Link} to="/blindbag">Blind Bag</Nav.Link>
              <Nav.Link  onClick={toggleTheme}>
                {theme === 'light' ? 'DARK MODE' : 'LIGHT MODE'}
              </Nav.Link>
              <LogOutButton as={Link} className="nav-link" />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNav;

