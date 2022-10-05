const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pkg = require("./package.json");

const apiRoot = "/";

//base simulada
const users = [
  {
    id: 1,
    firstName: "Daniel",
    lastName: "calvo",
    email: "dcalvo@polpocr.com",
  },
];

const todos = [
  {
    id: 1,
    title: "Universidad",
    keywords: "oficio, necesario, orden",
  },
];

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
app.options("*", cors());

const router = express.Router();

router.get("/", (req, res) => {
  return res.send(`${pkg.description} v${pkg.version}`);
});

//Ruta GET/users

router.get("/users", (req, res) => {
  res.json(users);
});

//Ruta GET/users/:id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.filter((user) => user.id == id)[0];

  return res.json(user);
});

//Ruta POST/users
app.post("/POST/users", (req, res) => {
  const { id, firstName, lastName, email } = req.body;
  if (id && firstName) {
    users.push({ id, firstName, lastName, email });
    res.json(users);
  }
});

//const users = name email

//GET /users/:id/todos
router.get("/users/:id/todos", (req, res) => {
  const { id } = req.params;
  const user = users.filter((user) => user.id == id)[0];
  
  
  return res.json(user && todos);
});

//  Servidor

app.use(apiRoot, router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
