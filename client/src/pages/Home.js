import { useEffect, useState } from 'react'
import TodoDetails from '../components/TodoDetails'
import TodoForm from '../components/TodoForm'
import Grid from '@mui/material/Unstable_Grid2'


function Home() {
  const [todos, setTodos] = useState(null)

  useEffect(() => {
    const todos = async () => {
      const res = await fetch('http://localhost:4500/api/todos/')
      const data = await res.json()

      if(res.ok) {
        setTodos(data)
      }
    }
    todos()
  }, [])

  const updateTodos = (newTodo) => {
    setTodos((prevTodos) => {
      return [newTodo, ...prevTodos]
    })
  }
  const deleteTodo = (removeTodo) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo._id !== removeTodo._id)
    })
  }

  return (
    <div className="home">
      <h2>All Todos</h2>
      <Grid container spacing={3}>
        <Grid xs={8}>
          {todos && todos.map((todo) => (
            <TodoDetails key={todo._id} todo={todo} deleteTodo={deleteTodo} />
          ))}
        </Grid>
        <Grid xs={4}>
          <TodoForm updateTodos={updateTodos}></TodoForm>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home