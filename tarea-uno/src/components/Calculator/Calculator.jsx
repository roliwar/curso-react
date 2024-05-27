import React from 'react';
import { useState, useEffect } from 'react'
import ButtonCircle from '../buttons/ButtonCircle/ButtonCircle';
import InputDisplay from '../inputs/InputDisplay/InputDisplay';
/*import '../../App.css'*/

const Calculator = () => {
const [operador, setOperador] = useState('');
  const [operando1, setOperando1] = useState('');
  const [operando2, setOperando2] = useState('');
  const [display, setDisplay] = useState('');
  const [stHizoCalculo, setStHizoCalculo] = useState(false);

  //const [stop, setStop] = useState('SIN_OPERANDO_1');

  const calcula = (tecla) => {
    let value = tecla
    let stateOperacion = getStatusOperacion();

    if(['1','2','3','4','5','6','7','8','9','0','00','.'].includes(value)){
      switch (stateOperacion) {
        case 'SIN_OPERANDO_1':
        case 'CON_OPERANDO_1':
            if(stHizoCalculo){
                limpiar();
            }
            
          if(value == '.'){
            if(operando1.indexOf('.') !== -1)
              return;
            else if(operando1 == '')
              value = '0.'
          }
          setOperando1(prev => prev + value)
          setDisplay(prev => prev + value)
          break;
        
        case 'CON_OPERADOR':
          if(value == '.'){
            if(operando2.indexOf('.') !== -1)
              return;
            else if(operando2 == '')
              value = '0.'
          }
          setOperando2(prev => prev + value)
          setDisplay(value)
          break;

        case 'CON_OPERANDO_2':
          if(value == '.'){
            if(operando2.indexOf('.') !== -1)
              return;
            else if(operando2 == '')
              value = '0.'
          }
          setOperando2(prev => prev + value)
          setDisplay(prev => prev + value)
          break;
      }
      
    }
    else if(['+','-','*','/'].includes(value)){
      switch (stateOperacion) {
        case 'CON_OPERANDO_1':
        case 'CON_OPERADOR':
          setOperador(value);
          break;
      }
    }
    else if(value == '='){
      let resultado = 0.0
      if (stateOperacion == 'CON_OPERANDO_2') {
        switch(operador){
          case '+':
            resultado = parseFloat(operando1) + parseFloat(operando2)
            break;

          case '-':
            resultado = parseFloat(operando1) - parseFloat(operando2)
            break;
          
          case '*':
            resultado = parseFloat(operando1) * parseFloat(operando2)
            break;
          
          case '/':
            resultado = parseFloat(operando1) / parseFloat(operando2)
            break;
            
        }

        setOperando1(resultado.toString())
        setOperando2('')
        setOperador('')
        setDisplay(resultado)
        setStHizoCalculo(true)
      }
    }
    else if(value == 'C'){
      /*setOperando1('')
      setOperando2('')
      setOperador('')
      setDisplay('')*/
      limpiar();
    }
  }

  const limpiar = () => {
    setOperando1('')
      setOperando2('')
      setOperador('')
      setDisplay('')
      setStHizoCalculo(false)
  }

  const handleKeyDown = (event) => {
    let tecla = event.key;
    if (!isNaN(tecla) || tecla === 'Backspace' || tecla === '.' || tecla === '='
        || tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/' || tecla === 'Enter' || tecla === 'Return') {
      if (tecla === 'Backspace') {
        //setDisplay(prevDisplay => prevDisplay.slice(0, -1));
      }
      else if(tecla == ".") {
          console.log(operando1.indexOf('.'))
        if(operando1.indexOf('.') !== -1){
          return;
        }
        else{
          console.log('operando1 NO tiene punto')
        }
      }
      else if(tecla == "Enter" || tecla == "Return") {
        console.log('enter')
        tecla = '='
      }
    }
    
      /*else {
        setDisplay(prevDisplay => prevDisplay + tmpDot + tecla);
      }*/
      calcula(tecla)
    
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNumberClick = (event) => {
    let value = event.target.value
    calcula(value)
  }

  const getStatusOperacion = () => {
    let newStateOperacion;
    if (operando1 !== '') {
      newStateOperacion = 'CON_OPERANDO_1';
      if (operador !== '') {
        newStateOperacion = 'CON_OPERADOR';
        if (operando2 !== '') newStateOperacion = 'CON_OPERANDO_2';
      }
      else newStateOperacion = 'CON_OPERANDO_1';
    }
    else newStateOperacion = 'SIN_OPERANDO_1';

    //setStop(newStateOperacion)

    return newStateOperacion;
  }

    return (
        <div onKeyDown={handleKeyDown} tabIndex={0}>
      <table>
        <tbody>
          {/* <tr>
            <td colSpan={4}>
              <InputDisplay text={stop} ></InputDisplay>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <InputDisplay text={operando1} ></InputDisplay>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <InputDisplay text={operador} ></InputDisplay>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>
              <InputDisplay text={operando2} ></InputDisplay>
            </td>
          </tr> */}
          <tr>
            <td colSpan={4}>
              <InputDisplay text={display} ></InputDisplay>
            </td>
          </tr>
          <tr>
            <td colSpan={4}>&nbsp;
            </td>
          </tr>
          <tr>
            <td colSpan={3}><ButtonCircle onClick={handleNumberClick} value={'C'} cssClass="tool clear" >CLEAR</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'/'} cssClass="operator" >&#247;</ButtonCircle></td>
          </tr>
          <tr>
            <td><ButtonCircle onClick={handleNumberClick} value={7}>7</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={8}>8</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={9}>9</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'*'} cssClass="operator">&#10005;</ButtonCircle></td>
          </tr>
          <tr>
            <td><ButtonCircle onClick={handleNumberClick} value={4}>4</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={5}>5</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={6}>6</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'-'} cssClass="operator" >&#9866;</ButtonCircle></td>
          </tr>
          <tr>
            <td><ButtonCircle onClick={handleNumberClick} value={1}>1</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={2}>2</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={3}>3</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'+'} cssClass="operator" >&#10009;</ButtonCircle></td>
          </tr>
          <tr>
            <td><ButtonCircle onClick={handleNumberClick} value={'00'} style="font-size: smaller;" >00</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'0'}>0</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'.'}>.</ButtonCircle></td>
            <td><ButtonCircle onClick={handleNumberClick} value={'='} cssClass="equal">&#9868;</ButtonCircle></td>
          </tr>
        </tbody>
      </table>
    </div>
    );
};

Calculator.displayName = 'Calculator'
export default Calculator;