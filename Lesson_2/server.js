const http = require("http");
const hostname = "127.0.0.1";
const PORT = 3001;

const users = [
  { name: "Rokas", password: "rokas123" },
  { name: "Tomas", password: "tomas123" },
];

const movies = [
  { name: "Nemo", hours: 2 },
  { name: "Avatar", hours: 3 },
];

const cars = [
  { id: 1, make: "Audi" },
  { id: 2, make: "BMW" },
  { id: 3, make: "Opel" },
];

let server = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  };
  res.writeHead(200, headers);
  switch (req.url) {
    case "/users":
      res.write(JSON.stringify(users));
      res.end();
      break;
    case "/movies":
      res.write(JSON.stringify(movies));
      res.end();
      break;
    case "/cars":
      res.write(JSON.stringify(cars));
      res.end();
      break;
    default:
      res.write(JSON.stringify([]));
      res.end();
  }
});

server.listen(PORT, hostname, () => {
  console.log(`Server running on port http://${hostname}:${PORT}/`);
});
