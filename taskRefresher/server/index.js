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

/**
 * @param {import('express').Request} req - Express request (expects task ID in params and {title, done} in body).
 * @param {import('express').Response} res - Express response returning the updated task JSON.
 *
 * @example
 * * // Request body:
 * * // { "title": "Buy groceries", "done": true }
 *
 * * // Response:
 * * // { "id": 5, "title": "Buy groceries", "done": 1, "created_at": "2025-10-05 14:10:00" }
 */
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

/**
 * @param {import('express').Request} req - Express request (expects task ID in params).
 * @param {import('express').Response} res - Express response.
 * @description
 * * Remove task with ID from database
 */
app.delete("/api/tasks/:id", (req, res) => {
  db.prepare("DELETE FROM tasks WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

app.listen(3000, () => console.log("API Running at http://localhost:3000"));
