import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <footer>
      <Link className="badge rounded-pill bg-primary me-2" to="/info">
        info
      </Link>
      &copy; MILKCRATE. (v1.0.21)
      <Link className="badge rounded-pill bg-primary ms-2" to="/about">
        about
      </Link>
    </footer>
  );
}

export default Footer;
