import { RiCheckFill } from "@remixicon/react";
import React, { useState } from "react";

const Card = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
    // setTasks((prev) => [
    //   { id: Date.now(), text: prev, completed: false },
    //   ...prev,
    // ]);
  };
  const updateTask = (taskId, newTask) => {
    setTasks((prev) =>
      prev.map((prevTask) => (prevTask.id === taskId ? newTask : prevTask))
    );
  };
  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((prevTask) => prevTask.id !== taskId));
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="bg-slate-500 text-2xl flex flex-col max-w-[60rem] w-[40rem] justify-start items-center p-10 ">
      <h1 className="mb-10 text-5xl font-semibold uppercase"> Todo List</h1>
      <form
        className="flex gap-5 w-full text-2xl"
        onSubmit={(e) => {
          e.preventDefault(); // Prevents the default form submission behavior
          addTask(); // Your custom form submission logic
        }}
      >
        <input
          className="bg-transparent border-blue-300 text-xl text-gray-300 border-2 focus:border-blue-500 outline-none rounded-lg w-full px-3 py-2"
          placeholder="Add a new task"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button
          className="px-6 py-2 bg-blue-700 rounded-md text-gray-300 outline-none"
          //   onClick={addTask}
          type="submit"
        >
          Add
        </button>
      </form>
      <ul className="mt-8 w-full">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex  justify-between pl-10  mb-3 border-b-2 pb-2 border-gray-400 items-center relative w-full    "
          >
            <div className="flex gap-5 items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className=" appearance-none h-5 w-5 border border-blue-500 rounded-sm flex cursor-pointer relative checked:bg-blue-500"
                //   style={{ backgroundColor: task.completed ? "blue" : "gray" }}
              />
              <span
                className={
                  task.completed ? "line-through text-gray-400" : "text-white"
                }
                htmlFor={task.id}
              >
                {task.text}
              </span>
            </div>

            {task.completed && (
              <span className="absolute px-[2.4rem] left-0 pointer-events-none ">
                <RiCheckFill
                  size={24} // set custom `width` and `height`
                  color="white" // set `fill` color
                  className="my-icon"
                />
              </span>
            )}

            <button
              className="ml-5 px-3 py-1 bg-blue-600 text-white rounded-md text-xl"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
