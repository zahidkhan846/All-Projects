const express = require("express");
const cors = require("cors");
require("dotenv").config();

const keySecret = process.env.SECRET_KEY;

const app = express();

const stripe = require("stripe")(keySecret);

app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  console.log("Getting Payment", total);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "inr",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log(`http://localhost:5000`);
});
