const express = require('express')
const router = express.Router()
const {createTodo, getATodo, getAllTodos, updateTodo, deleteTodo} = require('../controllers/todoController')

// GET all todos
router.get('/', getAllTodos)

// GET single todo
router.get('/:id', getATodo)

// POST a new todo
router.post('/', createTodo)

// DELETE a todo
router.delete('/:id', deleteTodo)

// UPDATE a todo
router.patch('/:id', updateTodo)



module.exports = router