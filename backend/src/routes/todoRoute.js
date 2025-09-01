const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const { createTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const router = express.Router();

router.post('/create-todo', verifyToken, createTodo);

router.get('/get-todo', verifyToken, getTodo);

router.put('/update-todo/:id', verifyToken, updateTodo);

router.delete('/delete-todo/:id', verifyToken, deleteTodo)

module.exports = router;