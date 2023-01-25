import React from "react";
import { FaShippingFast } from "react-icons/fa";
import { GiFireworkRocket } from "react-icons/gi";
import styles from "./Home.module.css";
import banner from "../../images/banner-1.jpg";
import bannerBottom from "../../images/banner-bottom.jpg";
import { brands } from "../../data";
import BrandCard from "../UI/BrandCard/BrandCard";

export function Home() {
  return (
    <section className="container">
      <div className={styles.homeContainer}>
        <div className={styles.header}>
          <h1>
            <span>Free Shipping only for you</span>
            <FaShippingFast />
          </h1>
        </div>
        <div className={styles.banner}>
          <img src={banner} alt="banner" className={styles.halfBannner} />
          <div className={styles.banner2}>
            <img src={bannerBottom} alt="banner" />
          </div>
        </div>
        <div className={styles.offer}>
          <h1>
            <GiFireworkRocket />
            <span>Deal Zone</span>
          </h1>
          <div className={styles.offerGrid}>
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
