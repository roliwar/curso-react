import React from 'react'
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Root from './assets/pages/Root';
import Dashboard from './assets/pages/Dashboard';
import Products from './assets/pages/Products';
import dataProducts from './data/products.json';
import StateContext from './assets/components/StateContext';
import Cart from './assets/pages/Cart';
import Invoice from './assets/pages/Invoice';

const data = dataProducts.products

const router = createBrowserRouter([{
  path: "/",
  element: <Root />,
  children: [
    {
      element: <Dashboard />,
      index: true
    },
    {
      path: 'products/:id',
      element: <Products />
    },
    {
      path: 'cart',
      element: <Cart />
    },
    {
      path: 'invoice',
      element: <Invoice />
    }
  ],
  
}  
]);

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartItemsCounter, setCartItemsCounter] = useState(0);

  useEffect(() => {
    const storedDataProducts = localStorage.getItem('dataProducts');
    const storedDataCart = localStorage.getItem('dataCart');
    const storedCartCounter = localStorage.getItem('dataCartCounter');

    if (storedDataProducts && storedDataProducts != "[]") {
      setProducts(JSON.parse(storedDataProducts));
    } else {
      setProducts(dataProducts.products);
      localStorage.setItem('dataProducts', JSON.stringify(dataProducts.products));
    }

    if (storedDataCart && storedDataCart != "[]") {
      setCart(JSON.parse(storedDataCart));
    } else {
      setCart([]);
      localStorage.setItem('dataCart', JSON.stringify([]));
    }    

    if (storedCartCounter && storedCartCounter != "[]") {
      setCartItemsCounter(JSON.parse(storedCartCounter));
    } else {
      setCartItemsCounter(0);
      localStorage.setItem('dataCartCounter', JSON.stringify(0));
    }
  }, []);  

  useEffect(() => {
    localStorage.setItem('dataProducts', JSON.stringify(products));
  }, [products]); 

  useEffect(() => {
    localStorage.setItem('dataCart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('dataCartCounter', JSON.stringify(cartItemsCounter));
  }, [cartItemsCounter]);

  return (
    <>
      <StateContext.Provider value={{ products, setProducts, cart, setCart, cartItemsCounter, setCartItemsCounter }}>
        <RouterProvider router={router} />
      </StateContext.Provider>
    </>
  )
}

export default App
