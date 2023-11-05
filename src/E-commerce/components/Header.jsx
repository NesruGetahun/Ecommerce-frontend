import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import GlobalContext from "../Context";

import logoImg from "../../assets/images/logo192.png";
import userImage from "../../assets/images/img-nesru-1.jpg";
import "./Header.scss";

const Header = () => {
  const { cart, updateCart } = useContext(GlobalContext);
  const [showNav, setShowNav] = useState(false);
  const activeStyle = {
    backgroundColor: "rgba(5, 5, 30, 0.5)",
    color: "#fafafafa",
  };

  const logoActiveStyle = {};

  const userActiveStyle = {
    borderWidth: 2,
  };

  useEffect(() => {
    updateCart();
  }, []);
  return (
    <header>
      <div className="navigation">
        <h1 className="logo">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return isActive ? logoActiveStyle : null;
            }}
            onClick={(e) => {
              setShowNav(false);
            }}
          >
            <img src={logoImg} alt="first user" />
          </NavLink>
        </h1>
        <ul className={showNav ? "navs moveIn" : "navs"}>
          <li className="option">
            <NavLink
              to="/shop"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              Shop
            </NavLink>
          </li>
          <li className="option">
            <NavLink
              to="/cart"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              Cart
            </NavLink>
            <span className="cart-batch">{cart.length}</span>
          </li>
          <li className="option">
            <NavLink
              to="/orders"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              Orders
            </NavLink>
          </li>
          <li className="option">
            <NavLink
              to="/admin"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              Admin
            </NavLink>
          </li>
          <li className="option">
            <NavLink
              to="/logout"
              style={({ isActive }) => {
                return isActive ? activeStyle : null;
              }}
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              Logout
            </NavLink>
          </li>
          <li className="user">
            <NavLink
              to="/user"
              style={({ isActive }) => {
                return isActive ? userActiveStyle : null;
              }}
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              <img src={userImage} alt="user" />
            </NavLink>
          </li>
        </ul>

        <div className="icon">
          {showNav ? (
            <p
              onClick={(e) => {
                setShowNav(false);
              }}
            >
              ❌
            </p>
          ) : (
            <p
              onClick={(e) => {
                setShowNav(true);
              }}
            >
              ➕
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
