import React, { useState, useEffect } from 'react';

const ToDoList = () => {
  const [tareas, setTareas] = useState([]);
  const [textoTarea, setTextoTarea] = useState('');

  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas'));
    if (tareasGuardadas) {
      setTareas(tareasGuardadas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const handleInputChange = (event) => {
    setTextoTarea(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (textoTarea.trim() !== '') {
      setTareas([...tareas, { descripcion: textoTarea, realizada: false }]);
      setTextoTarea('');
    }
  };

  const handleEliminar = (index) => {
    const tmpTareas = [...tareas];
    tmpTareas.splice(index, 1);
    setTareas(tmpTareas);
  };

  const handleToggleComplete = (index) => {
    const tmpTareas = [...tareas];
    tmpTareas[index].realizada = !tmpTareas[index].realizada;
    setTareas(tmpTareas);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={textoTarea} onChange={handleInputChange} className='input-tarea'/>
        <button type="submit" className='boton-agregar'>Agregar</button>
      </form>
      <br />
      
        {tareas.map((tarea, index) => (
          <div key={index} className='tarea-box'>
            <p key={index} style={{ textDecoration: tarea.realizada ? 'line-through' : 'none' }} className='tarea-parrafo'>
              <span onClick={() => handleToggleComplete(index)}>
                {tarea.descripcion}
              </span>
              <span className="boton-eliminar" onClick={() => handleEliminar(index)}>
              &#10006;
              </span>
            </p>
          </div>
        ))}
    </div>
  );
};

export default ToDoList;