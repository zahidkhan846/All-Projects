import React from "react";

function Hero() {
  return (
    <React.Fragment>
      <div className="hero">
        <div className="col1">
          <h1>Hi! I Am</h1>
          <h1 className="hero-zahid">Zahid Khan</h1>
          <p className="hero-paragraph">
            Full Stack Web developer who focuses on writing clean, elegant and
            efficient code.
          </p>
          <button className="primary-btn">View More</button>
        </div>
        <div className="col2">
          <svg
            id="visual"
            viewBox="0 0 500 500"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <g
              xmlns="http://www.w3.org/2000/svg"
              transform="translate(236.5038588026224 207.82164694496058)"
            >
              <path
                d="M100.5 -86.4C135.5 -65.5 172.8 -32.8 176.8 4C180.8 40.8 151.6 81.6 116.6 123.2C81.6 164.9 40.8 207.4 -4.4 211.8C-49.5 216.2 -99 182.3 -124.5 140.7C-150 99 -151.5 49.5 -149.6 1.9C-147.7 -45.7 -142.5 -91.5 -117 -112.3C-91.5 -133.1 -45.7 -129.1 -6.5 -122.6C32.8 -116.1 65.5 -107.2 100.5 -86.4"
                fill="#389bec"
              />
            </g>
            <g transform="translate(259.3991930781134 275.81308133863195)">
              <path
                d="M123.3 -135.9C152.3 -94.3 163.1 -47.1 168.6 5.4C174 58 174 116 145 140.6C116 165.3 58 156.6 14.3 142.4C-29.5 128.1 -58.9 108.3 -98.6 83.6C-138.3 58.9 -188.1 29.5 -190.1 -2C-192.1 -33.5 -146.3 -66.9 -106.6 -108.6C-66.9 -150.3 -33.5 -200.1 6.8 -207C47.1 -213.8 94.3 -177.6 123.3 -135.9"
                fill="#FDB510"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Hero;
