import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <div className="nav-section left">
        {/* cond render certain buttons depending on view */}
      </div>
      <div className="nav-section center">
        <Link to="/home">
          <h2 className="nav-title">milkcrate.</h2>
        </Link>
      </div>
      <div className="nav-section right">
        {!user.id && (
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>
            <Link className="navLink" to="/social">
              social
            </Link>
            <Link className="navLink" to="/spins">
              spin session
            </Link>
            <Link className="navLink" to="/blindbag">
              blind bag
            </Link>
            <LogOutButton className="navLink" />
            <Link className="navLink" to="/info">
              Info Page
            </Link>
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
