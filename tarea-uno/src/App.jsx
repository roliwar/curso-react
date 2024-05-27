import './App.css'
import Calculator from "./components/Calculator/Calculator"
import ToDoList from './components/ToDoList/ToDoList'

function App() {
  
  return (
    <>
      <div className='calculator-container'>
        <Calculator />
      </div>

      <br/>  
      <hr/>
      <br/>
      
      <div className='todolist-container'>
        <ToDoList />
      </div>            
    </>
  )

  
}

export default App
