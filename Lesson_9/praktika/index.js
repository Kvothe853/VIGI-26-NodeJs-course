const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const URI = process.env.CONNECTION;
const client = new MongoClient(URI);

app.get("/categories", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo4")
      .collection("categories")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/products", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo4")
      .collection("categories")
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "categorie_article",
            foreignField: "categorie",
            as: "customer_details",
          },
        },
      ])
      .toArray();
    await con.close();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/categoryvalue", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo4")
      .collection("products")
      .aggregate([
        {
          $group: {
            _id: "$categorie",
            total: { $sum: "$price" },
          },
        },
      ])
      .toArray();
    await con.close();
    res.send({ data });
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
