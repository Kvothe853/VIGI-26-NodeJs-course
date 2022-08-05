const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// "/" base path
// req - sutrumpinimas request zodzio. Kvietimas is vartotojo puses.
// res - sutrumpinimas resopone zodzio. Grazinimas is serverines dalies.

app.get("/", (req, res) => {
  res.send(["BMW", "AUDI", "VW"]);
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("OK");
});

app.listen(PORT, () =>
  console.log(`The server is running on http://localhost:${PORT}`)
);
