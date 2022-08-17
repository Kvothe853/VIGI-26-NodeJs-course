const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const URI = process.env.CONNECTION;
const client = new MongoClient(URI);

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo6").collection("users").find().toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db("demo6").collection("users").insertOne({
      name: "Tomas",
      email: "tomastomash@gmail.com",
    });
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo6")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "user_id", //.collection("orders") propery
            foreignField: "user_id", // from "customer" property
            as: "user_comments", // kaip norim pavadinti savo
          },
        },
      ])
      .toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/comments/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("demo6")
      .collection("comments")
      .deleteOne({ _id: ObjectId(`${req.params.id}`) });
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
