import React from "react";
import styles from "./ProductCard.module.css";
import wp1 from "../../../images/w-product1.jpg";
import { BiShoppingBag } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";

function ProductCard({ product }) {
  const handleLike = () => {};
  const handleBag = () => {};

  const discountedPrice =
    product.originalPrice - (product.originalPrice * product.discount) / 100;

  return (
    <article className={styles.productCard}>
      <img src={wp1} alt="productTitle" />
      <div className={styles.onHover}>
        <button className={styles.iconBtn} onClick={handleLike}>
          <FaRegHeart className={styles.icon} /> <span>Wishlist</span>
        </button>
        <button className={styles.iconBtn} onClick={handleBag}>
          <BiShoppingBag className={styles.icon} /> <span>Bag</span>
        </button>
        <p className="px-min">
          Sizes: <span>S, M, L, XL, XXL</span>
        </p>
      </div>
      <div className={styles.productInfo}>
        <h3 className="mb-min">{product.title}</h3>
        <p className="mb-min text-light capitalize one-line">{product.type}</p>
        <strong>
          <span className="mr-min">Rs. {discountedPrice}</span>{" "}
          <small className="mr-min text-crossed">
            Rs. {product.originalPrice}
          </small>{" "}
          <small className="text-red">({product.discount}% off)</small>
        </strong>
      </div>
    </article>
  );
}

export default ProductCard;
