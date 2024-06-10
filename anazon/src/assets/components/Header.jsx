import React, { useContext } from 'react'
import StateContext from '../components/StateContext';
import Navbar from './Navbar'
import imgLogo from '../../assets/images/logo-anazon.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function Header() {
  const { cartItemsCounter} = useContext(StateContext);
  return (
    <>
      <div className="container-fluid px-0">
        <nav className="navbar navbar-expand-lg bg-dark pt-3">
          <div className="container-fluid">
            <Link to={'/'} className='navbar-brand' >
                <img src={imgLogo} width={100} loading='lazy' alt="Anazon" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div >
              <Navbar />
              <form className="d-flex" role="search">
                <Link to={'cart'} className='btn btn-dark position-relative me-3'>
                    <FontAwesomeIcon icon={faCartShopping}  size="2x"/>
                    {cartItemsCounter > 0 &&
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cartItemsCounter}
                        <span className="visually-hidden">products in my cart</span>
                    </span>
                    }
                </Link>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
