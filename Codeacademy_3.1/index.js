const express = require("express");
const cors = require("cors");

const PORT = 8080;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/names", (req, res) => {
  res.send(["Airidas", "Deivydas", "Gabriele"]);
});

app.post("/names", (req, res) => {
  const names = [...req.body];
  console.log(names);
  res.send("OKPost");
});

app.listen(PORT, () => {
  console.log(`Server alive on http://localhost:${PORT}`);
});
