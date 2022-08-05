const casual = require("casual"); // nodejs naudojama sintaxe
// import casual from "casual"; // models kai dirbame su frontend react labiau

console.log("Airidas Smirnovas");
console.log(casual.city);

// random skaiciaus funkcija parasyti, kurioje galime irasyti nuo kiek iki kiek bus skaicius ir ji returninti
// function(1,10) => 5
// function(2,7) => 4

// 1
// casual.integer(1, 50);
function randomNumber(num1, num2) {
  return casual.integer((from = num1), (to = num2));
}
const randomPersonName = () => {
  return `${casual.name_prefix} ${casual.first_name} ${casual.last_name}`;
};
console.log(randomPersonName());

console.log(randomNumber(1, 5));
const sex = ["male", "female", "other"];
const sexRandom = () => sex[casual.integer(1, 2)];

// 2
const user2 = {
  firstname: casual.first_name,
  lastname: casual.last_name,
  gender: sexRandom(),
  adress: {
    country: casual.country,
    city: casual.city,
    street: casual.street,
  },
  email: casual.email,
  password: casual.password,
  age: casual.integer((from = 0), (to = 99)),
  birthmonth: casual.month_name,
  favorite_color: casual.color_name,
};

console.log(user2);
console.log(casual.username);

console.log(casual.integer(5, 10));

const uuidv = require("uuid");
console.log(uuidv.v4());

casual.define("user", () => ({
  firstName: casual.first_name,
  lastName: casual.last_name,
  gender: sexRandom(),
  adress: {
    country: casual.country,
    city: casual.city,
    street: casual.street,
  },
  email: casual.email,
  password: casual.password,
  age: casual.integer((from = 0), (to = 99)),
  birthMonth: casual.month_name,
  color: casual.color_name,
}));

console.log(casual.user);
