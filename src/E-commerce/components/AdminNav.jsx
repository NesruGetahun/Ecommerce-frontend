import React from "react";

import { NavLink } from "react-router-dom";

import "./AdminNav.scss";

function AdminNav() {
  const activeStyle = {
    backgroundColor: "rgba(5, 5, 30, 0.5)",
    color: "#fff",
  };

  return (
    <div className="adminNav">
      <ul className="navs">
        <li>
          <NavLink
            end
            to="/admin"
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
          >
            Products
          </NavLink>
        </li>
        <li className="option">
          <NavLink
            to="/admin/add"
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
          >
            Add Product
          </NavLink>
        </li>
        <li className="option">
          <NavLink
            to="/admin/setting"
            style={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
          >
            Setting
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminNav;
