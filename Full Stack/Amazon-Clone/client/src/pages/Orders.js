import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import "../styles/Orders.css";
import Order from "../components/Order/Order";

function Orders() {
  const { getOrders, orders } = useOrder();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      getOrders(currentUser.uid);
    }
  }, []);

  return (
    <div className="orders-container">
      <div className="orders">
        <h1>Your Orders</h1>
        <div className="each-order">
          {orders &&
            orders.map((order) => <Order key={order.id} order={order} />)}
        </div>
      </div>
    </div>
  );
}

export default Orders;
