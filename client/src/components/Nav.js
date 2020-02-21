import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-container">
      <span className="nav-logo">
        <Link to="/">
          <h1>ProvFound</h1>
        </Link>
      </span>
      <div className="nav-right">
        <span className="dropdown">
          <h3 className="dropdown-title">Menu</h3>
          <div className="dropdown-content">
            <Link to="/search">
              <h2>Find a Provider</h2>
            </Link>
            <Link to="/contact">
              <h2>Contact</h2>
            </Link>
            <Link to="/cart">
              <h2>Cart</h2>
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
}

export default Nav;
