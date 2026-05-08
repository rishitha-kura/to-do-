const express = require("express");

const router = express.Router();

const Todo = require("../models/Todo");


// GET TODOS
router.get("/", async (req, res) => {

  const todos = await Todo.find();

  res.json(todos);
});


// ADD TODO
router.post("/", async (req, res) => {

  const todo = new Todo({
    text: req.body.text,
  });

  const savedTodo = await todo.save();

  res.json(savedTodo);
});


// UPDATE TODO
router.put("/:id", async (req, res) => {

  const updatedTodo = await Todo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedTodo);
});


// DELETE TODO
router.delete("/:id", async (req, res) => {

  await Todo.findByIdAndDelete(req.params.id);

  res.json({
    message: "Deleted",
  });
});

module.exports = router;