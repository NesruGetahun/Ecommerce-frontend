import React, { useState, useEffect, useContext } from "react";

import LoadingSpinner from "../components/LoadingSpinner";
import CartItem from "../components/CartItem";

import GlobalContext from "../Context";

import "./Cart.scss";
import { Exception } from "sass";
import Empty from "../components/Empty";
function Cart() {
  const { cart, updateCart } = useContext(GlobalContext);
  const [items, setItems] = useState();

  let total = 0;
  items?.forEach((item) => {
    total += item.product.price * item.quantity;
  });

  const onDeleteItem = async (id) => {
    try {
      const response = await fetch("http://localhost:4002/cart", {
        method: "DELETE",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Exception("ERROR IN GETTING DELETING CART ITEM");

      updateCart();
    } catch (err) {
      console.log(err);
    }
  };

  const onChangingQuantity = async (id, type) => {
    try {
      const response = await fetch("http://localhost:4002/cart/quantity", {
        method: "POST",
        body: JSON.stringify({
          id,
          type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Exception("ERROR IN GETTING DELETING CART ITEM");

      updateCart();
    } catch (err) {
      console.log(err);
    }
  };

  const removeCart = async () => {
    try {
      const response = await fetch("http://localhost:4002/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok)
        throw new Exception("ERROR IN GETTING DELETING CART ITEM");

      updateCart();
    } catch (err) {
      console.log(err);
    }
  };

  const orderHandler = async (e) => {
    try {
      const response = await fetch("http://localhost:4002/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Exception("ERROR IN GETTING ORDER ITEMS");

      updateCart();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setItems(cart.items);
  }, [cart]);

  let Content = <LoadingSpinner />;
  if (items?.length === 0) {
    Content = <Empty text="Cart is Empty right now!" />;
  } else if (items?.length > 0) {
    Content = (
      <div className="cart">
        <div className="total-price">
          <p>
            <span>{total}</span> birr
          </p>
        </div>
        <div className="items">
          {items?.map((item) => {
            return (
              <CartItem
                key={item._id}
                name={item.product.name}
                price={item.product.price}
                URL={item.product.product_images?.at(0)}
                quantity={item.quantity}
                id={item.product._id}
                onDeleteItem={onDeleteItem}
                onChangingQuantity={onChangingQuantity}
              />
            );
          })}
        </div>

        <div className="btn-cont">
          <button
            className="remove"
            onClick={(e) => {
              removeCart();
            }}
          >
            Remove
          </button>
          <button className="order-btn" onClick={orderHandler}>
            Order
          </button>
        </div>
      </div>
    );
  }
  return Content;
}

export default Cart;
