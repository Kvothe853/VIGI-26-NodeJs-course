const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const URI = `mongodb+srv://root:${process.env.PASSWORD}@cluster0.cvc9hji.mongodb.net/?retryWrites=true&w=majority`;
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
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/products", async (req, res) => {
  try {
    const con = await client.connect();
    // const data = await con
    //   .db("demo4")
    //   .aggregate([
    //     { $match: {} },
    //     { $group: { _id: "$name", title: "$title" } },
    //   ]);

    const data = await con
      .db("demo4")
      .aggregate([{ $group: { _id: "$name" } }]);
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
