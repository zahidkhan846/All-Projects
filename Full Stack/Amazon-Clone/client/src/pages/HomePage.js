import React from "react";
import home from "../assets/home-banner.jpg";
import Product from "../components/Product/Product";
import { products } from "../utils/data";
import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="home">
      <div className="home-container">
        <img className="home-img" src={home} alt="home" />
        <div className="products">
          {products &&
            products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
