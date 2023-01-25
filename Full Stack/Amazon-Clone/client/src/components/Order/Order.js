import React from "react";
import moment from "moment";
import "./Order.css";
import Item from "../Item/Item";

function Order({ order }) {
  console.log(order);
  const { id } = order;
  const { createdAt, amount, order: currOrder } = order.data;

  return (
    <div className="order-container">
      <div className="order-card">
        <header className="order-card-header">
          <ul>
            <div className="date-total">
              <li>
                <span>ORDER PLACED</span>
                <span>{moment(createdAt).format("DD MMMM YYYY")}</span>
              </li>
              <li>
                <span>TOTAL</span>
                <span>
                  <small>₹ </small>
                  {amount / 100}.00
                </span>
              </li>
            </div>
            <div>
              <li className="o-id">
                <span>ORDER #</span>
                <span>{id}</span>
              </li>
            </div>
          </ul>
        </header>
        <main>
          <div className="main-title">
            <h4>Successful</h4>
            <p>Paid on: {moment(createdAt).format("DD MMMM YYYY")}</p>
          </div>
          <div>
            {currOrder.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Order;
