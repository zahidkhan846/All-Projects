import React from "react";
import { useCart } from "../../context/CartContext";
import "./CartItem.css";

function CartItem({ cartItem }) {
  const { title, desc, img, price, id } = cartItem;

  const { removeCartItem } = useCart();

  const handleClick = () => {
    removeCartItem(id);
  };

  return (
    <div className="detail py-5">
      <img src={img} alt={title} className="py-5" />
      <div className="meta">
        <h3>{title}</h3>
        <p>{desc}</p>
        <p className="py-5">Qunatity: 0</p>
        <h4 className="meta-price">
          <span>₹</span>
          {price}
        </h4>
        <button
          className="btn"
          style={{ margin: ".5rem 0" }}
          onClick={handleClick}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}

export default CartItem;
