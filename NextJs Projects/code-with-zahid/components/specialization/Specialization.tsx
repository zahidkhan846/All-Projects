import React from "react";

interface Props {}

const Specialization: React.FC<Props> = () => {
  return (
    <div>
      <h2>Specialization</h2>
      <div className="underline"></div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus
        molestias blanditiis modi ipsum, consequuntur autem! Dolore voluptas
        neque laboriosam temporibus.
      </p>
      <div className="cardsContainer">
        <div>
          <div className="card">
            <div className="icon"></div>
            <div className="header">Lorem ipsum dolor sit.</div>
            <div className="desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Pariatur, quidem!
            </div>
          </div>
          <div className="card">
            <div className="icon"></div>
            <div className="header">Lorem ipsum dolor sit.</div>
            <div className="desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Pariatur, quidem!
            </div>
          </div>
        </div>
        <div className="card">
          <div className="icon"></div>
          <div className="header">Lorem ipsum dolor sit.</div>
          <div className="desc">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
            quidem!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialization;
