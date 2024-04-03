import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="app-wrapper">
      <h1>Tasks</h1>

      <Form
        addTodo={(todo) => {
          setTodos((prev) => [...prev, todo]);
        }}
      />

      <div className="todo-list">
        {todos.map((todo, i) => (
          <Todo
            onDelete={() => {
              setTodos((prev) => {
                return prev.filter((_, y) => i !== y);
              });
            }}
            key={i}
          >
            {todo}
          </Todo>
        ))}
      </div>
    </div>
  );
}

const Form = ({ addTodo }) => {
  const onSubmit = (event) => {
    event.preventDefault();

    const todoText = event.currentTarget.elements.todo.value;
    addTodo(todoText);
    event.currentTarget.reset();
  };

  return (
    <form className="form-wrapper" onSubmit={onSubmit}>
      <input id="todo" className="input" type="text" placeholder="Add a task" />
      <button type="submit">Submit</button>
    </form>
  );
};

const Button = ({ children, ...props }) => {
  return (
    <button className="button" {...props}>
      {children}
    </button>
  );
};

const Todo = ({ children, onDelete }) => {
  return (
    <div className="todo-wrapper">
      <Checkbox />
      <span className="todo-text">{children}</span>
      <button onClick={onDelete} className="todo-delete">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
        </svg>
      </button>
    </div>
  );
};

const Checkbox = () => {
  const [checked, setChecked] = useState(false);
  const onChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {/* {checked && (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
    )} */}
    </div>
  );
};

export default App;
