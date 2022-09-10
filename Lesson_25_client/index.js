"use strict";

const form = document.forms[0];
console.log(form);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");

  if (emailInput.value && passwordInput.value) {
  } else {
    console.log("Please use correct info");
  }

  emailInput.value = "";
  passwordInput.value = "";
});
