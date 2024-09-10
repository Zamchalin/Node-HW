const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const counterFilePath = path.join(__dirname, "Counter.json");
const Counter = JSON.parse(fs.readFileSync(counterFilePath, "utf-8"));

fs.writeFileSync(
  path.join(__dirname, "Counter.json"),
  JSON.stringify(Counter, null, 2)
);

app.get("/", (req, res) => {
  Counter[0].count++;
  fs.writeFileSync(counterFilePath, JSON.stringify(Counter, null, 2));
  res.send(
    `<h1>Главная страница</h1><p>Количество просмотров: ${Counter[0].count}</p><a href = '/about'>Перейти на страницу о сайте</a>`
  );
});

app.get("/about", (req, res) => {
  Counter[1].count++;
  fs.writeFileSync(counterFilePath, JSON.stringify(Counter, null, 2));
  res.send(
    `<h1>О нас</h1><p>Количество просмотров: ${Counter[1].count}</p><a href = '/'>Перейти на главную страницу</a>`
  );
});

app.listen(3000);
