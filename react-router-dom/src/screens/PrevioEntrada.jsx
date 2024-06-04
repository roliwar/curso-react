import React from 'react'
import { Link } from 'react-router-dom'

const obtenerPrevio = (textoCompleto, maxPalabras = 50) => {
    const palabras = textoCompleto.split(' ');
    if (palabras.length > maxPalabras) {
      return palabras.slice(0, maxPalabras).join(' ') + '...';
    }
    return textoCompleto;
};

const PrevioEntrada = (props) => {  
    const {entrada} = props
    return (
        <div className="card" key={entrada.id}>
            <div className="card-header">
                <h2 className="card-title"><Link to={'/entradas/' + entrada.id} className='title-font-regular'>{entrada.titulo}</Link></h2>
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