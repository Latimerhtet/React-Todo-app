import React from "react";
import Todo from "./components/Todo";
import "./index.css";
const App = () => {
  return (
    <div className="main">
      <h1 className="heading">React Note Taking App</h1>
      <Todo />
    </div>
  );
};

export default App;
