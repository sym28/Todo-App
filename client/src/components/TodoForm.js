import { useState } from "react"
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function TodoForm({updateTodos}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const todo = {title, body, category}
    const res = await fetch('http://localhost:4500/api/todos/', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {'Content-Type': 'application/json'}
    })
    const json = await res.json()
    if (!res.ok) {
      console.log(json)
      setError(json.message)
    }
    if(res.ok) {
      setError(null)
      setTitle('')
      setBody('')
      setCategory('')
      console.log('new todo added to database', json)
      updateTodos(json)
      // window.location.reload(false)
    }


  }

  return (
    <Box component='form' sx={{}} onSubmit={handleSubmit} >
      
      <h3>Add a Todo</h3>

      <FormControl>
        <TextField
          label="Title" 
          variant="outlined" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{marginBottom: '20px'}}
          />
        <TextField
          label="Body" 
          variant="outlined" 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          multiline
          rows={4}
          />
      </FormControl>

      <FormControl sx={{marginY: '20px'}}>
        <FormLabel id="category-radio">Category</FormLabel>
        <RadioGroup 
          row aria-labelledby="category-radio" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel value='work' control={<Radio />} label='Work' />
          <FormControlLabel value='study' control={<Radio />} label='Study' />
          <FormControlLabel value='other' control={<Radio />} label='Other' />
        </RadioGroup>
      </FormControl>
        
      <Button variant="outlined" sx={{display: 'block'}} type="submit">Add</Button>
      
      {error && <div className="error">{error}</div> }

    </Box>
  )
}

export default TodoForm