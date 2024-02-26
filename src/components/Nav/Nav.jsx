import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const history = useHistory();

  const isFriendDetailPage =
    location.pathname.startsWith("/social/friends/") &&
    location.pathname.split("/").length >= 1;

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
        {location.pathname === "/user/add" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/user")}
          >
            home
          </button>
        )}
        {location.pathname === "/social" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/social/add")}
          >
            Add friend
          </button>
        )}
        {location.pathname === "/social/add" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/social")}
          >
            back
          </button>
        )}
        {isFriendDetailPage && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/social")}
          >
            back
          </button>
        )}
        {location.pathname === "/spins" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/spins/add")}
          >
            Add spin
          </button>
        )}
        {location.pathname === "/spins/add" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/spins")}
          >
            back
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
