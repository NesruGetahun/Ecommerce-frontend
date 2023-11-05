import React, { useState, useEffect } from "react";
import Empty from "../components/Empty";

import LoadingSpinner from "../components/LoadingSpinner";
import OrderItem from "../components/OrderItem";

import './Order.scss'
function Order() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch("http://localhost:4002/order", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) return
        const result = await response.json();
        setOrders(result);

      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);
  let Content = <LoadingSpinner />;
  if (orders?.length === 0) {
    Content = <Empty text="Order is Empty right now!" />;
  } else if (orders?.length > 0) {
    Content = orders.map((order) => {
      return <OrderItem order={order} key={order._id} />;
    });
  }
  return <div className="order">{Content}</div>;
}

export default Order;
