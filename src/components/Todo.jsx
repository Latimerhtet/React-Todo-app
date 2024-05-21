import React, { useEffect, useReducer, useState } from "react";
import "../index.css";

// reducer function to use in useReducer hook
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, action.payload];
    case ACTIONS.DELETE:
      return state.filter((todo) => todo.id !== action.payload);
    case ACTIONS.COMPLETE:
      return state.map((todo) =>
        todo.id !== action.payload ? todo : { ...todo, done: !todo.done }
      );
    case ACTIONS.UPDATE:
      return state.map((todo) =>
        todo.id !== action.payload.id
          ? todo
          : { ...todo, edit: !todo.edit, value: action.payload.newVal }
      );
    default:
      throw new Error();
  }
};

// Object for actions to use in Reducer function
const ACTIONS = {
  ADD: "add",
  UPDATE: "update",
  DELETE: "delete",
  COMPLETE: "complete",
};

const Todo = () => {
  // the initial array of todos
  let todos = [];

  const [inputVal, setInputVal] = useState("");
  const [state, dispatch] = useReducer(
    reducer,
    (todos = JSON.parse(localStorage.getItem("todos")))
  );

  // for storing the values in the local storage using useEffect
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  // for adding todo
  const add = (e) => {
    e.preventDefault();
    const data = {
      id: crypto.randomUUID(),
      value: inputVal,
      done: false,
      edit: false,
    };
    if (inputVal.trim().length !== 0) {
      dispatch({ type: ACTIONS.ADD, payload: data });
      setInputVal("");
    }
  };

  // for making complete to the todo
  const doneTodo = (id) => {
    dispatch({ type: ACTIONS.COMPLETE, payload: id });
  };

  // for deleting a selected todo
  const deleteTodo = (id) => {
    dispatch({ type: ACTIONS.DELETE, payload: id });
  };

  // for editing a todo
  const editTodo = (todo) => {
    const newVal = window.prompt("You can edit here!", todo.value);

    if (newVal.trim().length !== 0) {
      dispatch({
        type: ACTIONS.UPDATE,
        payload: { id: todo.id, newVal: newVal },
      });
    }
  };
  return (
    <form onSubmit={add}>
      <div className="inputContainer">
        <input
          className="inputBox"
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          autoFocus
        />
        <button className="submitBtn" type="submit">
          Add to Task
        </button>
      </div>
      <div className="todoContainer">
        {state.map((todo) => {
          return (
            <div key={todo.id} className="todo">
              <div className="todoText">
                <input
                  id={todo.id}
                  type="checkbox"
                  onChange={() => doneTodo(todo.id)}
                />
                <label
                  type="text"
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}
                  htmlFor={todo.id}
                >
                  {todo.value}
                </label>
              </div>
              <div>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
                <button onClick={() => editTodo(todo)} className="editBtn">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
};

export default Todo;
