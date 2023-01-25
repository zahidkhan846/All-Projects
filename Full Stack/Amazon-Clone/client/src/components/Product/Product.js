import React from "react";
import GradeIcon from "@material-ui/icons/Grade";
import "./Product.css";
import { useCart } from "../../context/CartContext";

function Product({ product }) {
  const { id, title, desc, rating, img, price } = product;

  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart({
      id: id,
      title: title,
      desc: desc,
      rating: rating,
      img: img,
      price: price,
    });
  };

  return (
    <div className="card">
      <div className="product">
        <img src={img} alt={title} />
        <div className="product-info">
          <p>
            {title} {desc}
          </p>
          <p className="price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className="product-rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>
                  <GradeIcon className="product-rating-icon" />
                </p>
              ))}
          </div>
        </div>

        <button className="btn" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
