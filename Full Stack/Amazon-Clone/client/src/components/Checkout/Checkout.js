import React from "react";
import checkout from "../../assets/checkout-banner.png";
import "./Checkout.css";
import banner from "../../assets/detail-banner.jpg";
import { Checkbox } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { getTotalPrice, useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import { useHistory } from "react-router";

function Checkout() {
  const { cart } = useCart();

  const history = useHistory();

  return (
    <div className="container">
      <section className="checkout-container">
        <div className="product-detail">
          <article className="detail-banner">
            <img src={banner} alt="banner" />
            <p className="py-1">
              Pay faster for all your shopping needs with Amazon Pay balance Get
              Instant refund on cancellations | Zero payment failures
            </p>
            {cart?.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </article>
        </div>
        <div className="product-total">
          <article className="total-banner">
            <img src={checkout} alt="checkout" />
          </article>
          <div className="price-card">
            <p className="icon-info">
              <InfoIcon className="icon" />
              <span>
                Add ₹500.00 of eligible items to your order to qualify for FREE
                Delivery. Details
              </span>
            </p>
            <p>
              Subtotal ({cart && cart.length} items): ₹ {getTotalPrice(cart)}
            </p>
            <p>
              <Checkbox />
              <span>This order contains a gift</span>
            </p>
            <button
              className="checkout-btn"
              onClick={() => history.push("/payment")}
            >
              Proceed to Buy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
