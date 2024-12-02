const express = require('express');
const router = express.Router();

// Example data to simulate a simple in-memory store (you can replace this with MongoDB later)
let todos = [
  { id: 1, title: 'Learn JavaScript' },
  { id: 2, title: 'Build an API' },
];

// GET route to retrieve all todos
router.get('/', (req, res) => {
  res.json(todos);
});

// POST route to create a new todo
router.post('/', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: todos.length + 1, // Simple ID generation (you can replace with a better approach)
    title,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE route to delete a todo by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(todo => todo.id == id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  res.status(200).json({ message: `Todo with ID ${id} deleted` });
});

module.exports = router;



