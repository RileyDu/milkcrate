import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="nav">
      <div className="nav-section left">
        {location.pathname === "/user" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/user/add")}
          >
            Add record
          </button>
        )}
        
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
              home
            </Link>
            <Link className="navLink" to="/social">
              social
            </Link>
            <Link className="navLink" to="/spins">
              spins
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
