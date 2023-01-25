import React from "react";
import styles from "./BrandCard.module.css";

function BrandCard({ brand }) {
  return (
    <div className={styles.card}>
      <img
        className={styles.mainImage}
        src={brand.brandImage}
        alt={brand.offer}
      />
      <img src={brand.brandLogo} alt={brand.offer} />
      <p>{brand.offer}</p>
    </div>
  );
}

export default BrandCard;
