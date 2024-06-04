import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

function Root() {
  return (
    <>
        <header>
            <nav className="navbar">
                <div>
                    <NavLink to='/' className={'logo-font'}>WortPrezz</NavLink>
                </div>
                <div className="menu-items">
                {
                    <NavBar />
                }
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Buscar..." />
                    <button type="button" className='button-link'>Buscar</button>
                </div>
            </nav>
        </header>      
        <div>
            <Outlet/>
        </div>
    </>
  )
}

Root.propTypes = {

}

export default Root


