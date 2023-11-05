import React from "react";
import { Routes, Route } from "react-router-dom";

import { ContextProvider } from "./Context";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";

import Header from "./components/Header";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import Logout from "./pages/Logout";
import User from "./pages/User";

import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";

function Ecommerce() {
  return (
    <ContextProvider>
      <div className="application">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Order />} />

          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/add" element={<AddProduct />} />
            <Route path="/admin" element={<Product />} />
            <Route path="/admin/setting" element={"SETTING"} />
          </Route>
          <Route path="/logout" element={<Logout />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default Ecommerce;
