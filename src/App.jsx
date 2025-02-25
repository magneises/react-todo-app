import { useState, useEffect } from 'react';
import './App.css';

const LOCAL_STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [task, setTask] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    if (title.trim() === "") return;
    const newTodo = {
      userId: 1,
      id: todos.length + 1,
      title,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTask("");
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
    <div className="App">
      <div className='todoEntryForm'>
        <h1>Todo List</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          addTodo(task);
        }}>
          <input
            type='text'
            placeholder='Add task'
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type='submit'>Add</button>
        </form>
      </div>

      <div className='todoQuickGlance'>
        <h2>Todo's</h2>
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
    </div>
  );
}

export default App;
