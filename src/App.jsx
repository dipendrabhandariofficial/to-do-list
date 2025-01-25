import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import {
  MdDarkMode,
  MdDeleteOutline,
  MdOutlineLightMode,
} from "react-icons/md";

const App = () => {
  const descriptionRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [editTask, setEditTask] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (title.trim() && description.trim()) {
      const newTask = {
        id: Date.now(),
        title,
        description,
        completed: false,
        editedAt: new Date().toISOString(),
      };
      const updatedTasks = editTask
        ? tasks.map((task) =>
            task.id === editTask.id
              ? {
                  ...task,
                  title,
                  description,
                  editedAt: new Date().toISOString(),
                }
              : task
          )
        : [...tasks, newTask];

      setTasks(updatedTasks);
      resetTaskForm();
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const handleOpenAddTask = () => {
    resetTaskForm();
    setIsAddingTask(true);
  };

  const handleToggleCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const resetTaskForm = () => {
    setTitle("");
    setDescription("");
    setEditTask(null);
    setIsAddingTask(false);
  };

  return (
    <div
      className="w-screen  min-h-screen bg-gradient-to-br from-sky-300 to-indigo-400 flex items-center justify-center p-6 
     "
      onKeyDown={(e) => e.key === "Enter" && { resetTaskForm }}
    >
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 relative dark:bg-gray-800 dark:text-white">
        <h1 className="text-3xl font-semibold text-gray-700 mb-8 text-center dark:text-gray-300">
          Your To-Do List
        </h1>

        <button
          onClick={handleOpenAddTask}
          className="cursor-pointer bg-gradient-to-bl from-orange-400 to-yellow-400 hover:bg-yellow-500 dark:bg-gradient-to-bl dark:from-gray-700 dark:to-gray-700 dark:hover:bg-gray-900 dark:text-gray-300 text-white w-full py-3 rounded-sm mb-6 font-medium "
        >
          + Add New Task
        </button>

        <div className="text-gray-800 dark:text-gray-300 ">
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between px-4 py-3 rounded-lg shadow-sm bg-white dark:bg-gray-700"
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleCompletion(task.id)}
                  className="cursor-pointer"
                />
                <span
                  className={`flex-grow ml-3 text-lg font-medium overflow-hidden truncate mr-2 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  <p
                    className="font-extralight text-xl overflow-hidden truncate cursor-pointer hover:focus "
                    title={task.title}
                    onClick={() => handleEditTask(task)} // Trigger function on click
                   // onKeyDown={(e) => e.key === "Enter" && handleEditTask(task)} // Trigger function on Enter key
                  >
                    {task.title}
                  </p>
                  <p
                    className={`text-sm font-sans font-thin overflow-x-hidden no-underline truncate cursor-pointer ${
                      task.completed ? "hidden" : ""
                    }  `}
                    tabIndex={0}
                    title={task.description}
                    onClick={() => handleEditTask(task)}
                  >
                    {task.description}
                  </p>
                </span>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <MdDeleteOutline size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {(editTask || isAddingTask) && (
          <div className="absolute inset-0 top-0   flex items-center justify-center ">
            <div className="bg-white   p-4 rounded-lg shadow-lg w-full md:w-md  dark:bg-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-center dark:text-gray-300">
                {editTask ? "Edit Task" : "Add Task"}
              </h2>
              <div className="mb-4">
                <input
                  type="text"
                  value={title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent default Enter behavior (new line)
                      descriptionRef.current.focus(); // Focus on description field
                    }
                  }}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-gray-500 dark:text-gray-300 text-2xl px-4 py-2 border border-none rounded-lg focus:outline-none "
                  placeholder="Title"
                />
              </div>
              <div className="mb-6 relative">
                <textarea
                  ref={descriptionRef}
                  value={description}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTitle(title); // Set the title
                      handleAddTask(); // Call the handleAddTask function
                    }
                  }}
                  onChange={(e) => setDescription(e.target.value)}
                  className=" overflow-y-hidden text-gray-500 dark:text-gray-300 w-full px-4 py-2 border border-none rounded-lg focus:outline-none "
                  rows="4"
                  placeholder="Task..."
                ></textarea>
                <div className="absolute right-0 text-sm text-gray-500">
                  Edited at{" "}
                  {editTask &&
                    new Date(editTask?.editedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={resetTaskForm}
                  className="px-4 py-2 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:bg-slate-600 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:bg-slate-600 text-gray-600 "
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsDarkMode((prevMode) => !prevMode)}
          className="absolute top-4 right-4 p-1 my-2 rounded-full text-white dark:bg-white dark:text-gray-800 cursor-pointer"
        >
          {isDarkMode ? (
            <MdDarkMode size={24} className="text-black bg-white" />
          ) : (
            <MdOutlineLightMode size={24} className="text-amber-300 bg-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default App;
