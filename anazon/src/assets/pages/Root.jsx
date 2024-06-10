import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

function Root() {
  return (
    <>
        <header>
            <Header />               
        </header>      
        <div className="p-3 bg-light" id="main-content">
            <Outlet/>
        </div>
    </>
  )
}

Root.propTypes = {

}

export default Root