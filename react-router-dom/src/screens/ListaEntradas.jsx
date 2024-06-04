import React from 'react'
import { useContext } from 'react'
import PrevioEntrada from './PrevioEntrada';

const ListaEntradas = (props) => {
    const { StateContext } = props
    const { entradas, setEntradas } = useContext(StateContext);

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