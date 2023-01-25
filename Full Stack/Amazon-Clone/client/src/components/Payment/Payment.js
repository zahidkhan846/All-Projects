import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getTotalPrice, useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import CurrencyFormat from "react-currency-format";
import "./Payment.css";
import { instance } from "../../config/axios";
import { firestore } from "../../config/firebaseConfig";

function Payment() {
  const { currentUser } = useAuth();
  const { cart, clearCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [secretKey, setSecretKey] = useState("");

  useEffect(() => {
    const getSecretKey = async () => {
      const res = await instance({
        method: "POST",
        url: `/payments/create?total=${getTotalPrice(cart) * 100}`,
      });
      setSecretKey(res.data.clientSecret);
    };

    getSecretKey();
  }, [cart]);

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(secretKey, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        firestore
          .doc(`users/${currentUser.uid}`)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            order: cart,
            amount: paymentIntent.amount,
            createdAt: Date.now(),
          });

        setSucceeded(true);
        setError("");
        setProcessing(false);

        clearCart();

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    setLoading(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          <Link to="/checkout">
            Checkout (
            {cart?.length > 1 ? `${cart.length} items` : `${cart.length} item`})
          </Link>
        </h1>

        <div className="payment-section">
          <h3>Delivery Address</h3>
          <div className="payment-address">
            <p>{currentUser?.email}</p>
            <p>32P, JUNGLE MATA DIN</p>
            <p>JAIL BYPASS ROAD GORAKHPUR</p>
          </div>
        </div>
        <div className="payment-section">
          <h3>Review your order</h3>
          <div className="payment-order">
            <ul>
              {cart &&
                cart?.map((c) => {
                  return (
                    <li>
                      <CartItem key={c.id} cartItem={c} />
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        <div className="payment-section">
          <h3>Payment Options</h3>
          <div className="payment-method">
            <form className="payment-card" onSubmit={handleSubmit}>
              {error && <p>{error}</p>}
              <div className="pyament-price">
                <CurrencyFormat
                  renderText={(value) => <h3>Total Order: {value}</h3>}
                  decimalScale={2}
                  value={getTotalPrice(cart)}
                  displayType="text"
                  thousandSeparator={true}
                  prefix={"₹"}
                />
              </div>
              <CardElement className="card-pay" onChange={handleChange} />
              <div className="button">
                <button
                  disabled={loading || processing || succeeded}
                  type="submit"
                  className={`${
                    loading || processing || succeeded
                      ? "disabled"
                      : "btn payment-btn"
                  }`}
                >
                  <span>{processing ? "Processing..." : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
