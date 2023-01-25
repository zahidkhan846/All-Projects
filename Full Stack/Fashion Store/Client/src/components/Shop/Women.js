import React from "react";
import { GiClothes } from "react-icons/gi";
import { products } from "../../data";
import ProductCard from "../UI/ProductCard/ProductCard";
import styles from "./shop.module.css";

function Women() {
  const womenProducts = products.filter(
    (product) => product.category === "women"
  );

  return (
    <div className={styles.section}>
      <h1>
        <GiClothes />
        <span>Clothing for Women</span>
      </h1>
      <section className={styles.cards}>
        {womenProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Women;
