const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const joi = require("joi");
const dataFilePath = path.join(__dirname, "users.json");
const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
app.use(express.json());
let uniqueID = 0;

const userScheme = joi.object({
  firstName: joi.string().min(1).required(),
  secondName: joi.string().min(1).required(),
  city: joi.string().min(0).max(150).required(),
  age: joi.number().min(1),
});

const readUsersFromFile = () => {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2), "utf-8");
};

app.get("/users", (req, res) => {
  const users = readUsersFromFile();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("Пользователь не найден");
  }
});

app.post("/users", (req, res) => {
  const result = userScheme.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = readUsersFromFile();
  uniqueID += 1;
  const newUser = {
    id: uniqueID,
    ...req.body,
  };
  users.push(newUser);
  writeUsersToFile(users);
  res.send({ id: uniqueID });
});

app.put("/users/:id", (req, res) => {
  const result = userScheme.validate(req.body);
  if (result.error) {
    return res.status(404).send({ error: result.error.details });
  }
  const users = readUsersFromFile();
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index !== -1) {
    users[index] = { id: parseInt(req.params.id), ...req.body };
    writeUsersToFile(users);
    res.json(users[index]);
  } else {
    res.status(404).send("Пользователь не найден");
  }
});

app.delete("/users/:id", (req, res) => {
  const users = readUsersFromFile();
  const newUsers = users.filter((u) => u.id !== parseInt(req.params.id));
  if (users.length !== newUsers.length) {
    writeUsersToFile(newUsers);
    res.status(204).send();
  } else {
    res.status(404).send("Пользователь не найден");
  }
});

app.listen("3000");
