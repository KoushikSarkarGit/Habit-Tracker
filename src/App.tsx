
import { Provider } from 'react-redux'
import './App.css'
import { store } from './store/store'
import { Container, Typography } from '@mui/material'
import AddHabitForm from './Components/AddHabitForm'
import ListHabit from './Components/ListHabit'




function App() {


  return (
    <>
      <Provider store={store}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom align="center">
            Habit Tracker
          </Typography>
          <AddHabitForm />
          <ListHabit />
        </Container>
      </Provider>

    </>
  )
}

export default App
