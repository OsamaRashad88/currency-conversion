import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/exchange.png";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} className="logo"></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/EUR/USD">
                  EUR-USD
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/EUR/GBP">
                  EUR-GBP
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
