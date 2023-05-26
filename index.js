const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

function generateId(db) {
  const maxId = db.length > 0 ? Math.max(...db.map((n) => n.id)) : 0;

  return maxId + 1;
}

app.get("/", (request, response) => {
  response.send("<h1>Hello, Express!</h1>");
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
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(notes),
  };

  notes = notes.concat(note);

  response.status(201).json(note);
});

app.put("/api/notes/:id", (request, response) => {
  const id = parseInt(request.params.id);
  const note = notes.find((note) => note.id === id);
  const { content, important } = request.body;

  const updatedNote = {
    ...note,
    content,
    important,
  };

  notes = notes.map((note) => (note.id === id ? updatedNote : note));

  response.status(200).json(updatedNote);
});

app.get;

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`);
});
