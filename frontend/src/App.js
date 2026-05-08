import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  // RENDER BACKEND URL
  const API_URL = "https://todo-backend-mf76.onrender.com/api/todos";

  // FETCH TODOS
  const fetchTodos = async () => {

    const res = await axios.get(API_URL);

    setTodos(res.data);
  };

  useEffect(() => {

    fetchTodos();

  }, []);

  // ADD TODO
  const addTodo = async () => {

    if (!text) {
      return alert("Enter task");
    }

    await axios.post(API_URL, {
      text,
    });

    setText("");

    fetchTodos();
  };

  // DELETE TODO
  const deleteTodo = async (id) => {

    await axios.delete(`${API_URL}/${id}`);

    fetchTodos();
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (todo) => {

    await axios.put(`${API_URL}/${todo._id}`, {
      completed: !todo.completed,
    });

    fetchTodos();
  };

  // FILTER TODOS
  const filteredTodos = todos.filter((todo) => {

    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0px 0px 20px rgba(0,0,0,0.3)",
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            color: "#243b55",
          }}
        >
          ✅ To-Do App
        </h1>

        {/* INPUT */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >

          <input
            type="text"
            placeholder="Enter task"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "16px",
            }}
          />

          <button
            onClick={addTodo}
            style={{
              padding: "15px 20px",
              border: "none",
              borderRadius: "10px",
              background: "#243b55",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add
          </button>

        </div>

        {/* FILTERS */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >

          <button onClick={() => setFilter("all")}>
            All
          </button>

          <button onClick={() => setFilter("active")}>
            Active
          </button>

          <button onClick={() => setFilter("completed")}>
            Completed
          </button>

        </div>

        {/* TODOS */}

        {

          filteredTodos.map((todo) => (

            <div
              key={todo._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#f4f4f4",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >

              <div>

                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                />

                <span
                  style={{
                    marginLeft: "10px",
                    textDecoration: todo.completed
                      ? "line-through"
                      : "none",
                    fontSize: "18px",
                  }}
                >
                  {todo.text}
                </span>

              </div>

              <button
                onClick={() => deleteTodo(todo._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default App;