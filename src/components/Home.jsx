import React, { useState } from 'react'

export default function Home() {
    const [task, setTask] = useState('');

    const handleSubmit = (e) => {
        if (task.trim() === '') return;
        addTodo(task);
        setTask('');
    };









    return (
        <div>
          <div className='todoEntryForm'>
            <h1>Create Todo List</h1>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  type='text'
                  placeholder='Add task'
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <button type='submit'>Submit</button>
              </label>
            </form>
          </div>
          <div className='todoQuickGlance'></div>
        </div>
      );
    }
