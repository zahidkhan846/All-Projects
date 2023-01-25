import React from "react";
import { GiClothes } from "react-icons/gi";
import { products } from "../../data";
import ProductCard from "../UI/ProductCard/ProductCard";
import styles from "./Featured.module.css";

function Featured() {
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <div className={styles.featuredSection}>
      <h1>
        <GiClothes />
        <span>New Arrivals</span>
      </h1>
      <section className={styles.featuredCards}>
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Featured;
