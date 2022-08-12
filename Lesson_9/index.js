const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const URI = process.env.CONNECTION;
const client = new MongoClient(URI);

const orders = [
  { product: "toothbrush", total: 4.75, customer: "Mike" },
  { product: "guitar", total: 199.99, customer: "Tom" },
  { product: "milk", total: 11.33, customer: "Karen" },
  { product: "pizza", total: 8.5, customer: "Karen" },
  { product: "toothbrush", total: 4.75, customer: "Mike" },
  { product: "pizza", total: 8.5, customer: "Tom" },
  { product: "toothbrush", total: 4.75, customer: "Mike" },
];
// { $match: { customer: {$in: ['Mike', 'Karen']} } },
// https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp

app.get("/fullOrders", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .aggregate([
        {
          $lookup: {
            from: "customers",
            localField: "customer", //.collection("orders") propery
            foreignField: "name", // from "customer" property
            as: "customer_details", // kaip norim pavadinti savo
          },
        },
      ])
      .toArray();
    console.log(data);
    await con.close();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/spent/:customer", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .aggregate([
        { $match: { customer: req.params.customer } },
        {
          $group: {
            _id: "$product",
            total: { $sum: "$total" },
          },
        },
        { $sort: { total: -1 } },
      ])
      .toArray();
    await con.close();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/count/:product", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .count({ product: req.params.product });
    await con.close();
    console.log(data);
    res.send({ count: data });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/many", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("9paskaita")
      .collection("orders")
      .insertMany(orders);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// ---

// app.get("/categories", async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db("demo4")
//       .collection("categories")
//       .find()
//       .toArray();
//     await con.close();
//     return res.send(data);
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });

// app.get("/products", async (req, res) => {
//   try {
//     const con = await client.connect();
//     const data = await con.db("demo4").aggregate([
//       {
//         $match: { title: "Phone" },
//       },
//       {
//         name: "$description",
//       },
//     ]);

//     await con.close();
//     return res.send(data);
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
