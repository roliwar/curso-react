import React, { useState, useEffect } from 'react';
import Todo from '../Todo/Todo';

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

  const handleEstadoRealizada = (index) => {
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
            <Todo key={index} tarea={tarea} index={index} onClickRealizada={handleEstadoRealizada} onClickEliminar={handleEliminar}/>
        ))}
    </div>
  );
};

export default ToDoList;