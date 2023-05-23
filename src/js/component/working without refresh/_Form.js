import React from "react";
import { useEffect } from "react/cjs/react.production.min";
import { v4 as uuidv4 } from "uuid";

function Form({ input, setInput, todos, setTodos, editTodo, setEditTodo }) {
  const updateTodo = (label, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { label, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };
  React.useEffect(() => {
    if (editTodo) {
      setInput(editTodo.label);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidv4(), label: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Enter a Todo..."
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      />
      <button className="button-add" type="submit">
        {editTodo ? "OK" : "ADD"}
      </button>
    </form>
  );
}

export default Form;
