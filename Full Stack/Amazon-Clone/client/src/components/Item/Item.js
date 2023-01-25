import "./Item.css";

import React from "react";

function Item({ item }) {
  console.log(item);

  const { desc, id, img, price, title } = item;

  return (
    <div className="item">
      <img src={img} alt={title} />
      <div>
        <p>
          <span className="item-title">{title}</span>
          <span>{desc}</span>
        </p>
        <p className="grey-text">
          Retun window is open for 10 days after delivery date.
        </p>
        <button className="item-btn">Buy it again</button>
      </div>
    </div>
  );
}

export default Item;
