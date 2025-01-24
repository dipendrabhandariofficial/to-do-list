import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";


const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };
  const deleteItem =()=>{
    setTasks={...newtask,index}
    

  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-blue-200 via-sky-300 to-blue-400 flex items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-white shadow-2xl shadow-gray-800 rounded-3xl p-6 z-50  ">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-600 text-center mb-6 shadow-lg">
           Your's To Do List
        </h1>

        {/* Input Section */}
        <div className="flex gap-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a new task..."
            className="flex-grow px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-700"
          />
          <button
            onClick={handleAddTask}
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 cursor-pointer"
          >
           <MdFormatListBulletedAdd />
          </button>
        </div>

        <div className="showlist text-gray-700 mt-6 text-2xl  font-[300] space-y-4 ">
          
          <ul className="space-y-4">
            {tasks.map((task,index)=>(
              <li 
              key={index}
               className="flex items-center cursor-pointer  justify-between px-4 py-3 rounded-lg shadow-sm text-gray-800"
              >
                <input type="checkbox" name="checkbox" id="" className="" />
                
                 <span className="w-[70%] capitalize ">{task}</span>

                 <button 
                  onClick={() =>
                    setTasks(tasks.filter((_, i) => i !== index))
                  }
                 className="text-gray-700   ml-8 cursor-pointer"
                 >
                  <FaEdit  />
                 </button>

                 <button 
                  onClick={() =>
                    setTasks(tasks.filter((_, i) => i !== index))
                  }
                 className="text-red-700  cursor-pointer"
                 >
                  <RiDeleteBack2Fill  />
                 </button>

                
            </li>
            ))}
            </ul>
          
          
        </div>
       
      </div>
    </div>
  );
};

export default App;
