import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";

const NewEntrada = (props) => {
    const { StateContext } = props
    const { entradas, setEntradas } = useContext(StateContext);
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const navigate = useNavigate();

    const onChangeTitulo = (event) => {
        setTitulo(event.target.value)
    }

    const onChangeContenido = (event) => {
        setContenido(event.target.value)
    }

    const onClickGuardar = (event) => {
        const fechaActual = obtenerFechaActual()
        
        let id = obtenerSigId(entradas)
        localStorage.setItem('dataEntradas', JSON.stringify([...entradas, { id: id, fecha: fechaActual, titulo: titulo, contenido: contenido }]));
        const storedData = localStorage.getItem('dataEntradas');
        setEntradas(JSON.parse(storedData));
        navigate("/");
    }

    const obtenerSigId = (array) => {
        const objetoConIdMasAlto = array.reduce((max, obj) => {
            return obj.id > max.id ? obj : max;
        }, { id: -Infinity });
        
        return objetoConIdMasAlto.id + 1;
    }

    const obtenerFechaActual = () => {
        const fechaActual = new Date();
        const dia = fechaActual.getDate().toString().padStart(2, '0');
        const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
        const año = fechaActual.getFullYear();
        return `${dia}/${mes}/${año}`;
    }

    let {entrada} = props
    if(entrada){
        setId(entrada.id)
        setTitulo(entrada.titulo)
        setContenido(entrada.contenido)
    }

    const btnDeshabilitado = titulo == '' || contenido == ''

    return (
        <div>
            <form>
                <input hidden id={'hdnIdEntrada'} value={id} readOnly/>
                <label htmlFor="titulo">Título:</label>
                <input type="text" value={titulo} onChange={onChangeTitulo} required/>
                <br /><br />
                <label htmlFor="contenido">Contenido:</label>
                <textarea value={contenido} onChange={onChangeContenido} rows="6" required></textarea>

                <button type="button" className='button-link' onClick={onClickGuardar} disabled={btnDeshabilitado}>Guardar</button>
            </form>
        </div>
    )
}

NewEntrada.displayName = 'NewEntrada'
export default NewEntrada
