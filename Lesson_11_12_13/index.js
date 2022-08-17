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

app.get("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("11Lesson")
      .collection("services")
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("11Lesson")
      .collection("services")
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("11Lesson")
      .collection("users")
      .aggregate([
        {
          $lookup: {
            from: "services",
            localField: "service_id",
            foreignField: "id",
            as: "membership_info",
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

app.post("/users", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("11Lesson")
      .collection("users")
      .insertOne(req.body);
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.get("/memberships/:id", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("11Lesson")
      .collection("services")
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
