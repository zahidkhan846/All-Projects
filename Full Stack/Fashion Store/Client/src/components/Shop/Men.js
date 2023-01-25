import React from "react";
import { GiClothes } from "react-icons/gi";
import { products } from "../../data";
import ProductCard from "../UI/ProductCard/ProductCard";
import styles from "./shop.module.css";

function Men() {
  const menProducts = products.filter((product) => product.category === "men");

  return (
    <div className={styles.section}>
      <h1 className="text-green">
        <GiClothes />
        <span>Clothing for Men</span>
      </h1>
      <section className={styles.cards}>
        {menProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Men;
