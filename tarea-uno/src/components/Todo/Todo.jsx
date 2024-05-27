import React from 'react';
import './Todo.css'

const Todo = (props) => {
    const {tarea, index, onClickRealizada, onClickEliminar} = props

    return (
        <div key={index} className='tarea-box'>
            <p key={index} style={{ textDecoration: tarea.realizada ? 'line-through' : 'none' }} className='tarea-parrafo'>
                <span onClick={onClickRealizada}>
                {tarea.descripcion}
                </span>
                <span className="boton-eliminar" onClick={onClickEliminar}>
                &#10006;
                </span>
            </p>
        </div>
    );
};

Todo.displayName = 'Todo'
export default Todo;