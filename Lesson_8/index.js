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

app.get("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo2").collection("pets").find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/pets", async (req, res) => {
  try {
    const con = await client.connect();
    const dbRes = await con.db("demo2").collection("pets").insertOne({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/pets/:type", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo2")
      .collection("pets")
      .find({ type: req.params.type })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/pets/age/byoldest", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo2")
      .collection("pets")
      .sort({ age: -1 })
      .toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
