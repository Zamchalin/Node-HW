const http = require("http");
let countMainPage = 0;
let countAboutPage = 0;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    countMainPage++;
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>Главная страница</h1>
         <a href="/about">Переход на страницу обо мне</a>
         <p>На этой странице ты был ${countMainPage}</p>`);
  } else if (req.url === "/about") {
    countAboutPage++;
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end(`<h1>Обо мне</h1>
      <a href='/''>Перейти на главную страничку!</a>
      <p>На этой странице ты был ${countAboutPage}</p>
      `);
  } else {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=UTF-8",
    });
    res.end("<h1>Error 404</h1>");
  }
});

const post = "3000";
server.listen(post);
