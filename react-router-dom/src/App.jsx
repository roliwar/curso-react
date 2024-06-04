import * as React from "react";
import { createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import ErrorPage from "./screens/ErrorPage";
import Root from "./screens/Root";
import ListaEntradas from "./screens/ListaEntradas";
import Entradas from "./screens/Entradas";
import NewEntrada from "./screens/NewEntrada";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ListaEntradas />,
        index: true
      },
      {
        path: 'entradas/:id',
        element: <Entradas />
      },
      {
        path: 'new-post',
        element: <NewEntrada />
      }
    ],
    
  }  
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      
    </>
  )
}

export default App