import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import './App.css';
import initialData from './Data';

function App() {
  const [todos, setTodos] = useState(initialData);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = (title) => {
    const newTodo = {
      userId: 1,
      id: todos.length + 1,
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // edit function
  const startEditing = (id, title) => {
    setEditingTodoId(id);
    setEditText(title);
  };

  
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: editText } : todo
      )
    );
    setEditingTodoId(null);
  };

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
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => editTodo(todo.id)}>Save</button>
                  <button onClick={() => setEditingTodoId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />
                  {todo.title}
                  <button onClick={() => startEditing(todo.id, todo.title)}>Edit</button>
                  <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Router>
  );
}
export default App;
