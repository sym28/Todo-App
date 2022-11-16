import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton'
import {formatDistanceToNow} from 'date-fns'


function TodoDetails({todo, deleteTodo}) {

  const handleClick = async () => {
    const res = await fetch('https://todo-app-11fd.onrender.com/api/todos/' + todo._id, {
      method: 'DELETE'
    })
    const json = await res.json()
    if(res.ok) {
      console.log('todo deleted', json)
      deleteTodo(json)
    } else {
      console.log('could NOT delete', json)
    }
  }
  
  return (
    <Card sx={{marginBottom: '15px', maxWidth: '700px'}}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid xs={11}>
            <Typography variant='h4'>
              {todo.title}
            </Typography>
            <Typography color='text.secondary'>
              {formatDistanceToNow(new Date(todo.createdAt), {addSuffix: true})}
            </Typography>
            <p>Category:  
              <Typography color='text.secondary' variant='span'>
                 {' ' + todo.category}
              </Typography>
            </p>
            <Typography variant='body'>
              {todo.body}
            </Typography>
            
          </Grid>
          <Grid xs={1}>
            <IconButton aria-label='delete' size='large' onClick={handleClick}>
              <DeleteOutlineOutlinedIcon 
                fontSize='inherit' 
                sx={{color: 'red'}}
              >
              </DeleteOutlineOutlinedIcon>
            </IconButton>
          </Grid>
        </Grid>
      </CardContent> 
    </Card>
  )
}

export default TodoDetails
