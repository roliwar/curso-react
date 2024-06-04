import * as React from "react";
import {createContext, useEffect, useState } from "react"
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./screens/ErrorPage";
import Root from "./screens/Root";
import ListaEntradas from "./screens/ListaEntradas";
import Entradas from "./screens/Entradas";
import NewEntrada from "./screens/NewEntrada";
import dataEntradas from "./data/dataEntradas";

const StateContext = createContext();
const data = dataEntradas

const router = createBrowserRouter([{
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ListaEntradas StateContext={StateContext} />,
        index: true
      },
      {
        path: 'entradas/:id',
        element: <Entradas StateContext={StateContext} />
      },
      {
        path: 'new-post',
        element: <NewEntrada StateContext={StateContext} />
      }
    ],
    
  }  
]);

function App() {
  const [entradas, setEntradas] = useState([]);

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

  useEffect(() => {
    localStorage.setItem('dataEntradas', JSON.stringify(entradas));
  }, [entradas]);

  return (
    <>
      <StateContext.Provider value={{ entradas, setEntradas }}>
        <RouterProvider router={router} />
      </StateContext.Provider>
    </>
  )
}

export default App