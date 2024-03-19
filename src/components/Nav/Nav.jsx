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
    location.pathname.split("/").filter(Boolean).length === 3;

  const isSpinDetailPage =
    location.pathname.startsWith("/spins/details/") &&
    location.pathname.split("/").filter(Boolean).length === 3;

  const isRecordDetailPage =
    location.pathname.startsWith("/user/details/") &&
    location.pathname.split("/").filter(Boolean).length === 3;

  return (
    <div className="nav">
      <div className="nav-section left">
        {isRecordDetailPage && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/user/profile")}
          >
            home
          </button>
        )}
        {location.pathname === "/user/add" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/user/profile")}
          >
            home
          </button>
        )}
        {location.pathname === "/social" && (
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => history.push("/social/add")}
          >
            Add friend
          </button>
        )}
        {location.pathname === "/social" && (
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => history.push("/social/recentlySpun")}
          >
            Lastest Listens
          </button>
        )}
        {location.pathname === "/social/recentlySpun" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/social")}
          >
            back
          </button>
        )}
        {location.pathname === "/social" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/social/hotp")}
          >
            Hot Off The Press
          </button>
        )}
        {location.pathname === "/social/hotp" && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/social")}
          >
            back
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
        {isSpinDetailPage && (
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => history.push("/spins")}
          >
            back
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
        {user.id ? (
          <Link to="/user/profile">
            <h2 className="nav-title">milkcrate.</h2>
          </Link>
        ) : (
          <Link to="/home">
            <h2 className="nav-title">milkcrate.</h2>
          </Link>
        )}
      </div>
      <div className="nav-section right">
        {!user.id && (
          <Link className="navLink" to="/">
            ‎
          </Link>
        )}

        {user.id && (
          <>
            <Link className="navLink" to="/user/profile">
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
            <LogOutButton className="btn btn-outline-secondary btn-sm" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
