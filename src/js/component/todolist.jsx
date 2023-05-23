import React, { useEffect, useState } from "react";
// import TodoList from "./itemstatus.jsx";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Ranger-Jay", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTodos([...data]));
  }, []);

  const addTask = (e) => {
    // stops app from refreshing when entering task//
    e.preventDefault();
    let task = {
      label: e.target.todo.value,
      done: false,
    };

    todos.push(task);

    fetch("https://assets.breatheco.de/apis/fake/todos/user/Ranger-Jay", {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...todos]);
        e.target.todo.value = "";
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTask = (i) => {
    let filtered = todos.filter((todo, index) => {
      return index !== i;
    });

    fetch("https://assets.breatheco.de/apis/fake/todos/user/Ranger-Jay", {
      method: "PUT",
      body: JSON.stringify(filtered),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([...filtered]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/Ranger-Jay", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>
      <div className="todoAdd">
        <form className="todo-form" onSubmit={addTask}>
          <input
            type="text"
            name="todo"
            placeholder={
              todos[0] ? "Add more & press enter." : "Add a todo & press enter"
            }
          ></input>
        </form>
      </div>
      <ul className="task-list">
        {todos.map((todo, i) => {
          return (
            <li key={i} className="task-item">
              <p>{todo.label}</p>
              <button className="list-delete" onClick={() => deleteTask(i)}>
                X
              </button>
            </li>
          );
        })}
      </ul>
      <button className="deleteAll" onClick={() => handleDeleteAll()}>
        Delete All
      </button>
    </div>
  );
};
export default TodoList;
