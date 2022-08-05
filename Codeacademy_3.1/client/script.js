"use strict";

let names = [];

fetch("http://localhost:8080/names", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(["Hello"]),
});
