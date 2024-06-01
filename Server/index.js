const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./Models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Endpoints
app.get("/get", (req, res) => {
  Todo.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, { completed: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.post("/add", (req, res) => {
  const { task } = req.body;
  Todo.create({ task })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
