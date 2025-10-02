const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

/** Get a Task */
app.get("/api/tasks", (req, res) => {
  const rows = db.prepare("SELECT * FROM tasks ORDER BY id DESC").all();
  res.json(rows);
});

/** Upload a Task */
app.post("/api/tasks", (req, res) => {
  const title = (req.body.title || "").trim();
  if (!title) return res.status(400).json({ error: "title required" });

  const info = db.prepare("INSERT INTO tasks (title) VALUES (?)").run(title);
  const row = db
    .prepare("SELECT * FROM tasks where id=?")
    .get(info.lastInsertRowid);
  res.status(201).json(row);
});

/** Update a Task */
app.put("/api/tasks/:id", (req, res) => {
  const { title, done } = req.body;
  db.prepare("UPDATE tasks SET title = ?, done = ? WHERE id = ?").run(
    title,
    done ? 1 : 0,
    req.params.id
  );
  const row = db.prepare("SELECT * FROM tasks WHERE id=?").get(req.params.id);
  res.json(row);
});

/** Delete a Task */
app.delete("/api/tasks/:id", (req, res) => {
  db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

app.listen(3000, () => console.log("API Running at http://localhost:3000"));
