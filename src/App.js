
import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const cookieTasks = getCookie('todoList');
    if (cookieTasks) {
      setTasks(JSON.parse(cookieTasks));
    }
  }, []);

  const handleAddTask = () => {
    const taskInput = document.getElementById('task');
    const task = taskInput.value;
    if (task === '') {
      alert('Please enter a task!');
      return;
    }
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    taskInput.value = '';
    setCookie('todoList', JSON.stringify(newTasks), 7);
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setCookie('todoList', JSON.stringify(newTasks), 7);
  };

  //setting the cookies with new task
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toGMTString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  //retrieve the cookie  value by name 
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => handleDeleteTask(index)}>X</button>
          </li>
        ))}
      </ul>
      <input type="text" id="task" placeholder="Enter task" />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default App;
