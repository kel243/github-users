import React from "react";
import "./Nav.css";

function Nav() {
  return (
    <div
      style={{
        height: "60px",
        width: "100vw",
        backgroundColor: "#222831",
        position: "fixed",
        top: "0px",
        left: "0px",
        zIndex: "10",
      }}
    >
      <div className="nav-container">
        <a className="nav-link" href="/">
          Github Users
        </a>
      </div>
    </div>
  );
}

export default Nav;
