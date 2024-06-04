import React from 'react'
import { useState, useEffect } from 'react'
import dataEntradas from '../data/dataEntradas';
import PrevioEntrada from './PrevioEntrada';

const data = dataEntradas

const ListaEntradas = (props) => {
    const [entradas, setEntradas] = useState([]);
    //localStorage.clear()
    
    useEffect(() => {
        const storedData = localStorage.getItem('dataEntradas');
        if (storedData) {
            setEntradas(JSON.parse(storedData));
        }
        else{
            setEntradas([...data])
            const tmpEntradas = [...data]
            localStorage.setItem('dataEntradas', JSON.stringify(tmpEntradas));
        }
    }, []);

    return (
        <div className="container">
            {
                entradas.map(item => (
                    <PrevioEntrada key={item.id} entrada={item} /> 
                ))
            }
        </div>
    )
}
ListaEntradas.displayName = 'ListaEntradas'
export default ListaEntradas