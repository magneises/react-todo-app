import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home'
import './App.css'

import initialData from './Data'

function App() {
  const [todos, setTodos] = useState(initialData);

  const addTodo = (title) => {
    const newTodo = {
      id: todos.length +1,
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home addTodo={addTodo} />} />
      </Routes>

      <div className='todoQuickGlance'>
        <h2>Todo List</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </Router>
  );
}
export default App
