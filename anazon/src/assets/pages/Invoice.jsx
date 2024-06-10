import React, { useContext, useState,  useEffect } from 'react'
import StateContext from '../components/StateContext';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

const Invoice = () => {
    const invoice = JSON.parse(localStorage.getItem('invoice'));
    const invoiceItemCounter = parseInt(JSON.parse(localStorage.getItem('invoiceItemCounter')));

    const { cart, setCart, products, cartItemsCounter, setCartItemsCounter } = useContext(StateContext);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    let cartProduct = null
    
    useEffect(() => {
        getTotal();
    }, []); 
    
    useEffect(() => {
        getTotal();
    }, [cart]); 

    const formatPrice = (price) => {
        let priceString = parseFloat(price).toFixed(2).toString();
        return "$" + priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const getTotal = () => {
        let invoice = JSON.parse(localStorage.getItem('invoice'));
        const storedDataProducts = JSON.parse(localStorage.getItem('dataProducts'));
        let tmpTotal = 0;

        invoice.map(cartItem => {
            let product = storedDataProducts.find(product => product.id ==  cartItem.id)
            if(product){
                tmpTotal += parseFloat(product.price)
            }
        })
        setTotal(parseFloat(tmpTotal))
    }

    const onClickLetsGo = () => {
        navigate("/");
    }

    return (
        <>
            <div className='pb-3'>
                <Link to='/' className='text-decoration-none'>
                    <FontAwesomeIcon icon={faAnglesLeft}  size="sm" /> Back
                </Link>
            </div>
            <div className='row'>
                <div className='col-9'>
                    <div className="card">
                        <div className="card-body">
                            <div className="row pb-2 m-1">
                                {invoiceItemCounter > 0 &&
                                <div>
                                    <div className='mb-5 pb-3 border-bottom'><h2>Thank you for your purchase!</h2></div>
                                    <div className='col-12 text-center'><h2>Your Invoice</h2></div>
                                </div>
                                }
                                {invoiceItemCounter == 0 &&
                                    <div className='col-12'><h2>Nothing to see Here.</h2>
                                        <button type='button' className='btn btn-warning rounded-3 mt-3 mb-4 fw-semibold' onClick={onClickLetsGo}>Let's go shopping!</button>
                                    </div>
                                }                        
                            </div>

                            {invoiceItemCounter > 0 &&
                            <>
                                    
                                <div className='row'>
                                    <div className='col-4 mb-5'>
                                        <p className='fs-5 fw-bold mb-0'>Anazon.com, Inc.</p>
                                        <p className='fs-5 mb-0'>410 Terry Avenue North</p>
                                        <p className='fs-5 mb-0'>Seattle, WA 9810-5211</p>
                                        <p className='fs-5 mb-0'>USA</p>
                                    </div>
                                    <div className='col-4 mb-5'>
                                        <p className='fs-5 fw-bold mb-0'>Bill To:</p>
                                        <p className='fs-5 mb-0'>Robert Zimmerman</p>
                                        <p className='fs-5 mb-0'>61 Highway Blvd.</p>
                                        <p className='fs-5 mb-0'>Misuri, MN 52441</p>
                                        <p className='fs-5 mb-0'>USA</p>
                                    </div>
                                    <div className='col-4 mb-5'>
                                        <table>
                                            <body>
                                                <tr>
                                                    <td><b className='fs-5 me-2'>Invoice #:</b></td>
                                                    <td className='fs-5 me-2'>521142</td>
                                                </tr>
                                                <tr>
                                                    <td><b className='fs-5 me-2'>Invoice date:</b></td>
                                                    <td className='fs-5 me-2'>10/06/2024</td>
                                                </tr>
                                                <tr>
                                                    <td><b className='fs-5 me-2'>P.O. #:</b></td>
                                                    <td className='fs-5 me-2'>RZ - 1</td>
                                                </tr>
                                                <tr>
                                                    <td><b className='fs-5 me-2'>Due date:</b></td>
                                                    <td className='fs-5 me-2'>09/07/2024</td>
                                                </tr>
                                            </body>
                                        </table>
                                    </div>
                                </div>
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Unit price</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        invoice.map(item => {
                                            cartProduct = products.find(product => product.id === item.id);
                                            return cartProduct && (
                                                <tr key={cartProduct.id}>
                                                    <td>1</td>
                                                    <td>{cartProduct.title}</td>
                                                    <td className='text-end'>{formatPrice(cartProduct.price)}</td>
                                                    <td className='text-end'>{formatPrice(cartProduct.price) }</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                                    
                                <div className="row m-1 py-4 text-end">
                                    <div className='fs-4'>Total ({invoiceItemCounter} items): <span className='fw-bold fs-4'>{formatPrice(total)}</span></div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
            
    )
}
Invoice.displayName = 'Invoice'
export default Invoice