import React from "react";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import TodoList from "./TodoList";

//create your first component
const Home = () => {
  const [input, setInput] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [editTodo, setEditTodo] = React.useState(null);

  React.useEffect(() => {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/tester")
      .then((resp) => {
        return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
      })
      .then((data) => {
        //here is were your code should start after the fetch finishes
        console.log(data); //this will print on the console the exact object received from the server
        setTodos(data);
      })
      .catch((error) => {
        //error handling
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          <Form
            input={input}
            setInput={setInput}
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
            editTodo={editTodo}
          />
        </div>
        <div>
          <TodoList
            todos={todos}
            setTodos={setTodos}
            setEditTodo={setEditTodo}
          />
        </div>
        <div>
          <Footer todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
};

export default Home;
