import React from "react";
import TodoList from "./TodoList";

function Footer({ todos, setTodos }) {
  const handleDeleteAll = () => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/tester", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
        setTodos([]);
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  };

  return (
    <div className="footerdiv">
      <p>{`${todos.length}` + " Todos Left"}</p>
      <button onClick={() => handleDeleteAll()}>DELETE ALL</button>
    </div>
  );
}
export default Footer;
