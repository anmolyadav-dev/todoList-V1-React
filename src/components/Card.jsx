import { RiCheckFill } from "@remixicon/react";
import React, { useState, useRef, useEffect } from "react";

const Card = () => {
  // using local storage
  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const getTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  };

  // .......................................................................

  const [tasks, setTasks] = useState(getTasksFromLocalStorage);

  const [newTask, setNewTask] = useState("");
  const [isEditable, setIsEditable] = useState({});
  const inputRefs = useRef({});
  //   ------------------------
  useEffect(() => {
    // This effect runs once when the component mounts
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  //   ----------------------------
  //    ADD TASKS
  const addTask = () => {
    if (newTask.trim() !== "") {
      const taskId = Date.now();
      const newTasks = [
        { id: taskId, text: newTask, completed: false },
        ...tasks,
      ];
      setTasks(newTasks);
      setIsEditable((prev) => ({ ...prev, [taskId]: false }));
      setNewTask("");
      saveTasksToLocalStorage(newTasks); //setting task to local storage
    }
  };
  //
  // ------update tasks
  const updateTask = (taskId, newTask) => {
    const newTasks = tasks.map((prevTask) =>
      prevTask.id === taskId ? newTask : prevTask
    );
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  //   --------------DELETE TASKS
  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((prevTask) => prevTask.id !== taskId);
    setTasks(newTasks);
    saveTasksToLocalStorage(newTasks);
  };

  //   ----------------TOGGLE TASKS
  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    inputRefs.current[taskId].disabled = !inputRefs.current[taskId].disabled;
  };

  //   ----------------
  const handleKeyDown = (event, taskId) => {
    if (event.key === "Enter") {
      // Trigger Save button click
      document.getElementById(`saveButton-${taskId}`).click();
    }
  };
  return (
    <div className="bg-white/30 rounded-lg backdrop-blur-sm text-2xl flex flex-col sm:max-w-[60rem] sm:w-[50rem] mobile:w-[25rem] justify-start items-center p-10 ">
      <h1 className="mb-10 text-5xl font-semibold uppercase text-white mobile:text-3xl">
        {" "}
        Todo List
      </h1>
      <form
        className="flex gap-5 w-full text-2xl mobile:flex-col sm:flex-row"
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
            className="flex flex-wrap  sm:justify-between pl-6  mb-3 border-b-2 pb-2 border-gray-400 sm:items-center relative w-full sm:flex-row  mobile:flex-col mobile:justify-center mobile:gap-6 mobile:items-left"
          >
            <div className="flex gap-5 items-center">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className=" appearance-none h-5 w-5 border border-blue-500 rounded-sm flex cursor-pointer relative checked:bg-blue-500 mobile:pl-5"
                //   style={{ backgroundColor: task.completed ? "blue" : "gray" }}
              />
              <input
                className={`${
                  task.completed ? "line-through text-gray-400" : "text-white"
                } bg-transparent  outline-none  focus:border-blue-500 focus:border-b-2 focus:backdrop-blur-sm focus:bg-white/30 focus:rounded-md p-2 mobile:w-11/12`}
                value={task.text}
                onChange={(e) => {
                  updateTask(task.id, { ...task, text: e.target.value });
                }}
                readOnly={!isEditable[task.id]}
                ref={(inputRef) => (inputRefs.current[task.id] = inputRef)}
                onKeyDown={(e) => handleKeyDown(e, task.id)} // this is so that when pressed enter it clicks save button
              ></input>
            </div>

            {task.completed && (
              <span className="absolute sm:px-[2.4rem] sm:left-[-0.9rem]  pointer-events-none mobile:top-3">
                <RiCheckFill
                  size={24} // set custom `width` and `height`
                  color="white" // set `fill` color
                  className="my-icon"
                />
              </span>
            )}

            <div className="flex gap-4 mobile:justify-between">
              <button
                id={`saveButton-${task.id}`} //this is so that when pressed enter it works
                className="ml-5 px-3 py-1 bg-blue-600 text-white rounded-md text-xl"
                onClick={() => {
                  if (task.completed)
                    setIsEditable((prev) => ({ ...prev, [task.id]: false }));
                  else if (!task.completed) {
                    inputRefs.current[task.id].focus();
                    setIsEditable((prev) => ({
                      ...prev,
                      [task.id]: !prev[task.id],
                    }));
                  }
                }}
              >
                {isEditable[task.id] ? "Save" : "Edit "}
              </button>
              <button
                className="ml-5 px-3 py-1 bg-blue-600 text-white rounded-md text-xl"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
