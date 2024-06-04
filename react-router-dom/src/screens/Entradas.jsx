import React from 'react'
import { useParams } from 'react-router-dom'

const entradas = JSON.parse(localStorage.getItem('dataEntradas'))

const Entradas = () => {
    const {id} = useParams()
    const entrada = entradas.find(entrada => entrada.id ==  id);

    return (
        <div className='container-entrada'>
            <div className='entrada'>
                <p className='entrada-titulo'>{entrada.titulo}</p>
                <p className='fecha-entrada'>Publicado el {entrada.fecha}</p>
                <p>{entrada.contenido}</p>
            </div>
        </div>
    )
}

Entradas.displayName = 'Entradas'
export default Entradas