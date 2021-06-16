import React, { useState, useEffect } from "react";
import shortid from "shortid";

function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  const addTask = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba la tarea a agregar ...");
      return;
    }
    setTareas([...tareas, { id: shortid.generate(), task: tarea }]);
    this.getTasks();
    setTarea("")
    setError(null)
  };

  const deleteTask = (id) => {
    const array = tareas.filter((item) => item.id !== id);
    setTareas(array);
  };

  const update = (item) => {
    setEdit(true)
    setTarea(item.task)
    setId(item.id)
  };

  const updateTask = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba la tarea a actualizar ...");
      return;
    }
    const array = tareas.map((item) => item.id === id ? { id, task: tarea } : item);
    setTareas(array);
    setEdit(false);
    setTarea("");
    setId("");
    setError(null);
  };

  const getTasks = async () => {
    const res = await fetch('http://10.147.20.77:5000/');
    const data = await res.json();
    setTareas([...data])
  };
  
  useEffect(() => {
    getTasks();
  }, [])

  return (
    <div className="container mt-5">
      <h1 className="text-center">TODO List</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item">No hay tareas</li>
            ) : (
                tareas.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.task}</span>
                    <button
                      className="btn btn-danger btn-sm float-end mx-2"
                      onClick={() => deleteTask(item.id)}
                      disabled={edit}
                    >
                      Eliminar
                  </button>
                    <button className="btn btn-warning btn-sm float-end" onClick={() => update(item)}>
                      Editar
                  </button>
                  </li>
                ))
              )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">{edit ? "Editar" : "Agregar"}</h4>
          <form className="d-grid" onSubmit={edit ? updateTask : getTasks}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {edit ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
                <button className="btn btn-dark btn-block" type="submit">
                  Agregar
                </button>
              )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
