import React from "react";
import { GiClothes } from "react-icons/gi";
import { products } from "../../data";
import ProductCard from "../UI/ProductCard/ProductCard";
import styles from "./shop.module.css";

function Others() {
  const otherProducts = products.filter(
    (product) => product.category === "others"
  );

  return (
    <div className={styles.section}>
      <h1 className="text-grey">
        <GiClothes />
        <span>New Arrivals</span>
      </h1>
      <section className={styles.cards}>
        {otherProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Others;
