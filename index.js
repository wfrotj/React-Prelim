// const http = require("http");
// const PORT = 3001;

// let notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only Javascript",
//     important: false,
//   },
//   {
//     id: 1,
//     content: "HTML is easy",
//     important: true,
//   },
// ];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

// app.listen(PORT);
// console.log(`Server is now running on port ${PORT}`);

const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    important: false,
  },
  {
    id: 3,
    content: "HTML is easy",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello, Epxress!!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.status(200).json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);

  response.status(200).json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  notes = notes.filter((note) => note.id === id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const maxId = notes.length + 1;
  const note = request.body;
  note.id = maxId;

  notes = notes.concat(note);
  response.json(note);
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
