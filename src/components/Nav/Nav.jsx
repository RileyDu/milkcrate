import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

function CustomNav() {
  const user = useSelector((store) => store.user);

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
              <Nav.Link as={Link} to="/user/profile">Home</Nav.Link>
              <Nav.Link as={Link} to="/social">Social</Nav.Link>
              <Nav.Link as={Link} to="/spins">Spins</Nav.Link>
              <Nav.Link as={Link} to="/blindbag">Blind Bag</Nav.Link>
              <LogOutButton className="nav-link" />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNav;

// Nav links depending on all the loccations?
