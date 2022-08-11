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
    const data = await con.db("demo5").collection("pets").find().toArray();
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/pets", async (req, res) => {
  console.log(req.body);
  try {
    const con = await client.connect();
    const data = await con.db("demo5").collection("pets").insertOne({
      name: req.body.name,
      type: req.body.type,
      age: req.body.age,
    });
    await con.close();
    return res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/pets/:types/:order?", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo5")
      .collection("pets")
      .find({ type: { $in: req.params.types?.split(",") } })
      .sort({ age: req.params.order?.toLocaleLowerCase() === "dsc" ? -1 : 1 })
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
