import React from "react";
import Title from "./Title";
import { services } from "../utility/constants/services";

export default function Services() {
  return (
    <section className="section bg-grey">
      <Title title={"services"} />
      <div className="section-center services-center">
        {services.map((service) => {
          const { id, icon, title, text, devTitle } = service;
          return (
            <article key={id} className="service">
              {icon}
              <h4>{title}</h4>
              <p>{text}</p>
              <p>{devTitle}</p>
              <div className="underline"></div>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  margin: "auto",
                  width: "80%",
                }}
              >
                <li>{service.html}</li>
                <li>{service.css}</li>
                <li>{service.react}</li>
                <li>{service.js}</li>
                <li>{service.scss}</li>
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
