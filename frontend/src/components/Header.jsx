import React from "react";
import logo from '../VlogoW.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Logo"  className="logo" />

        <nav>
          <ul className="nav-links">

            <li><a href="https://www.victvs.co.uk/">Home</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;