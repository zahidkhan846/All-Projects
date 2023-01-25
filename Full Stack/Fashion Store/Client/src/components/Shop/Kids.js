import React from "react";
import { GiClothes } from "react-icons/gi";
import { products } from "../../data";
import ProductCard from "../UI/ProductCard/ProductCard";
import styles from "./shop.module.css";

function Kids() {
  const kidsProducts = products.filter(
    (product) => product.category === "kids"
  );

  return (
    <div className={styles.section}>
      <h1 className="text-blue">
        <GiClothes />
        <span>Clothing for Kids</span>
      </h1>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.pathname = "/";
        }}
      >
        Click
      </button>
      <section className={styles.cards}>
        {kidsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Kids;
