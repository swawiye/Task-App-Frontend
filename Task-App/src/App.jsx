import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  
  // CRUD Operations
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tasks/").then((res) => {
      setTasks(res.data);
    }); // "http://127.0.0.1:8000/" -port on which the server is running
  }, []);
  
  const addTask = () => {
    axios.post("http://127.0.0.1:8000/api/tasks/", {title: newTitle})
    .then((res) => {
      setTasks([...tasks, res.data]);
      setNewTitle("");
    });
  };

  const toggleTask = (tasks) => {
    axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      ...tasks,
      completed: !tasks.completed,
    })
    .then((res) => {
      setTasks(tasks.map((t) => (t.id === tasks.id ? res.data : t)))
    });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`).then(() => {
      setTasks(tasks.filter((task) => task.id !== id))
    });
  };

  return (
  <>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">📝 Task Tracker</h1>

        <div className="flex gap-2 mb-4">
          <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
          Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
          <li
          key={task.id}
          className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-md border"
          >
          <span
          onClick={() => toggleTask(task)}
          className={`flex-grow cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
          }`}
          >
          {task.title}
          </span>
          <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
          >
          ✕
          </button>
          </li>
          ))}
        </ul>
      </div>
    </div>
  </>
  )
}

export default App

