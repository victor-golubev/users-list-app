import { NavLink } from "react-router-dom";
import "./Navigation.css";
import React from "react";

const Navigation = React.memo(() => {
  return (
    <header className="navigation">
      <div className="container">
        <h1>Users List App</h1>
        <nav className="nav-buttons">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Главная
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Избранное
          </NavLink>
        </nav>
      </div>
    </header>
  );
});

export default Navigation;
