import React from 'react'
import { Link } from 'react-router-dom'

const obtenerPrevio = (textoCompleto, maxPalabras = 50) => {
    const palabras = textoCompleto.split(' ');
    if (palabras.length > maxPalabras) {
      return palabras.slice(0, maxPalabras).join(' ') + '...';
    }
    return textoCompleto;
};

const onClickEliminar = (event) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta entrada?');
    if (confirmDelete) {
        /*const updatedEntries = entries.filter(post => post.id !== id);
        localStorage.setItem('posts', JSON.stringify(updatedEntries));
        setEntries(updatedEntries);*/
        alert('eliminado')
    }
}

const PrevioEntrada = (props) => {  
    const {entrada} = props
    return (
        <div className="card" key={entrada.id}>
            <div className="card-header">
                <h2 className="card-title"><Link to={'/entradas/' + entrada.id} className='title-font-regular'>{entrada.titulo}</Link></h2>
                <span className="boton-eliminar" onClick={onClickEliminar} title='Eliminar esta entrada'>
                    &#10006;
                </span>
            </div>
            <div className="card-body">
                <p className='fecha-entrada'>Publicado el {entrada.fecha}</p>
                <p className="card-text">{obtenerPrevio(entrada.contenido)}</p>
            </div>
            <div className="card-footer">
                <p><Link to={'/entradas/' + entrada.id} className='button-link'>Leer más...</Link></p>
            </div>
        </div>
    )
}

PrevioEntrada.displayName = 'PrevioEntrada'
export default PrevioEntrada