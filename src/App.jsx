import React, { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );

  const [isUpdateTask, setIsUpdateTask] = useState(false);

  const [currentTaskToEdit, setCurrentTaskToEdit] = useState({});

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask() {
    if (checkIfTaskExists(inputValue)) {
      alert("Task already exists!");
      return;
    }
    const newTask = {
      id: Date.now(),
      task: inputValue,
      isDone: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setInputValue("");
  }

  function checkIfTaskExists(currentTask) {
    return tasks.some(
      (task) => task.task.toLowerCase() === currentTask.toLowerCase(),
    );
  }

  function handleUpdateTask() {
    const updatedTasks = tasks.map((task) => {
      if (task.id === currentTaskToEdit.id) {
        return { ...task, task: inputValue };
      }
      return task;
    });
    setTasks(updatedTasks);
    setIsUpdateTask(false);
    setInputValue("");
  }

  function handleSelectedCheckBox(taskId, isChecked) {
    console.log("taskId is", taskId);
    console.log("isChecked is", isChecked);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isDone: isChecked };
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  console.log("tasks are", tasks);

  function handleDeleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function handleEditTask(taskId) {
    let currentTaskToEdit = {};
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === taskId) {
        currentTaskToEdit = tasks[i];
      }
    }
    console.log("currentTaskToEdit is", currentTaskToEdit.task);
    setIsUpdateTask(true);
    setInputValue(currentTaskToEdit.task);
    setCurrentTaskToEdit(currentTaskToEdit);
  }
  return (
    <>
      <input
        type={"text"}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {isUpdateTask ? (
        <button
          onClick={handleUpdateTask}
          disabled={
            inputValue.toLowerCase() === currentTaskToEdit.task.toLowerCase()
          }
        >
          Update Task
        </button>
      ) : (
        <button onClick={handleAddTask} disabled={inputValue === ""}>
          Add Task
        </button>
      )}

      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type={"checkbox"}
            checked={task.isDone}
            onChange={(event) =>
              handleSelectedCheckBox(task.id, event.target.checked)
            }
          />
          <span
            style={{
              textDecoration: task.isDone ? "line-through" : "none",
            }}
          >
            {" "}
            {task.task}
          </span>
          <button
            onClick={() => handleEditTask(task.id)}
            disabled={task.isDone}
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteTask(task.id)}
            disabled={task.isDone}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
