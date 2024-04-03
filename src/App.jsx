import { useState, useEffect } from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  // Chargement des tâches sauvegardées lors du premier rendu
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Sauvegarde des tâches chaque fois qu'elles changent
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="app-wrapper">
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>TodoVite.app</h1>
      <p>Ajouter des tâches facilement et rapidement</p>

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
      <input id="todo" className="input" type="text" placeholder="Ajouter une tâche" />
      <button type="submit">Ajouter</button>
    </form>
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
    </div>
  );
};

export default App;
