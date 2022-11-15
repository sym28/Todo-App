const { json } = require('express')
const Todo = require('../models/TodoModel')
const mongoose = require('mongoose')


// get all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({createdAt: -1})

    res.status(200).json(todos)

  } catch (error) {
    console.log(error.message)
    res.status(400).json({message: error.message})
  }
}

// get a single todo
const getATodo = async (req, res) => {
  const todoID = req.params.id
  // check if id is valid
  if(!mongoose.Types.ObjectId.isValid(todoID)) {
    return res.status(404).json({error: 'no such workout'})
  }
  const todo = await Todo.findById(todoID)
  if(!todo) {
    return res.status(404).json({error: 'no such workout'})
  }
  res.status(200).json(todo)
}

// create new todo
const createTodo = async (req, res) => {
  const emptyField = []
  if(!req.body.title) {
    emptyField.push('title')
  }
  if(!req.body.body) {
    emptyField.push('body')
  }
  if(!req.body.category) {
    emptyField.push('category')
  }
  if(emptyField.length > 0) {
    const fieldString = emptyField.reduce((prev, current) => `${prev}, ${current}`)
   return res.status(400).json({message: 'Missing Fields: ' + fieldString})
  }

  try {
    const todo = await Todo.create(req.body)
    res.status(200).json(todo)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: error.message})
  }
}

// delete todo
const deleteTodo = async (req, res) => {
  const todoID = req.params.id
  try {
    const todo = await Todo.findByIdAndDelete(todoID)
    console.log(todo)
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({message: 'could not delete todo', error})
  }

}

// update todo
const updateTodo = async (req, res) => {
  const todoID = req.params.id
  try {
    // run validator for category
    const todo = await Todo.findByIdAndUpdate(todoID, req.body, {runValidators: true})
    if(!todo) {
      throw 'todo does not exist to update'
    }
    res.status(200).json({message: 'todo update', todo})
  } catch (error) {
    res.status(404).json({message: 'did not work', error})
  }
}

module.exports = {createTodo, getATodo, getAllTodos, updateTodo, deleteTodo}
