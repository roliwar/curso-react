import React, { useContext, useState,  useEffect } from 'react'
import StateContext from '../components/StateContext';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
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
    
    const onClickDeleteCartItem = (e) => {
        const idItemToDelete = e.currentTarget.getAttribute('data-item-id');
        const storedDataCart = JSON.parse(localStorage.getItem('dataCart'));
        const updatedCart = storedDataCart.filter(item => item.id != idItemToDelete.toString());
        const updatedCartItems = cartItemsCounter - 1 < 0 ? 0 : cartItemsCounter - 1;
    
        setCart(updatedCart);
        setCartItemsCounter(prev => (prev - 1))
        localStorage.setItem('dataCart', JSON.stringify(updatedCart));
        localStorage.setItem('dataCartCounter', JSON.stringify(updatedCartItems));
    }

    const getTotal = () => {
        const storedDataCart = JSON.parse(localStorage.getItem('dataCart'));
        const storedDataProducts = JSON.parse(localStorage.getItem('dataProducts'));
        let tmpTotal = 0;

        storedDataCart.map(cartItem => {
            let product = storedDataProducts.find(product => product.id ==  cartItem.id)
            if(product){
                tmpTotal += parseFloat(product.price)
            }
        })
        setTotal(parseFloat(tmpTotal))
    }

    const onClickCheckout = () => {
        const invoice = [...cart];
        const invoiceItemCounter = cartItemsCounter;

        localStorage.setItem('invoice', JSON.stringify(invoice));
        localStorage.setItem('invoiceItemCounter', JSON.stringify(invoiceItemCounter));

        setCart([]);
        setCartItemsCounter(0);
        localStorage.setItem('dataCart', JSON.stringify([]));
        localStorage.setItem('dataCartCounter', JSON.stringify(0));

        navigate("/invoice");
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
                            <div className="row border-bottom pb-2 m-1">
                                {cartItemsCounter > 0 &&
                                    <div className='col-6'><h2>Shopping Cart</h2></div>
                                }
                                {cartItemsCounter == 0 &&
                                    <div className='col-6'><h2>Your Anazon Cart is empty.</h2>
                                        <button type='button' className='btn btn-warning rounded-3 mt-3 mb-4 fw-semibold' onClick={onClickLetsGo}>Let's go shopping!</button>
                                    </div>
                                }
                                <div className='col-6 text-end'><span className='text-dark fs-5 align-bottom'>Price</span></div>                        
                            </div>
                            {
                                cart.map(item => {
                                    cartProduct = products.find(product => product.id === item.id);
                                    return cartProduct && (
                                        <div className="row border-bottom m-1 py-4" key={cartProduct.id}>
                                            <div className="col-3">
                                                <img src={cartProduct.thumbnail} alt={cartProduct.title} width={150} loading='lazy' className='mx-auto d-block' />
                                            </div>
                                            <div className="col-7">
                                                <h5>{cartProduct.title}</h5>
                                                <div className='mb-2'>{cartProduct.description}</div>
                                                {cartProduct.stock <= 10 &&
                                                <div className='small text-danger mb-2'>Only {cartProduct.stock} left in stock - order soon</div>
                                                }
                                                {cartProduct.stock > 10 &&
                                                <div className='small text-success mb-2'>In Stock</div>
                                                }
                                                <a href="#" className='small text-decoration-none' data-item-id={cartProduct.id} onClick={onClickDeleteCartItem}>Delete</a>
                                            </div>
                                            <div className="col-2 text-end pl-0">
                                            <span className='fs-4 fw-bold'>{formatPrice(cartProduct.price)}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                                
                            <div className="row m-1 py-4 text-end">
                                <div className='fs-4'>Total ({cartItemsCounter} items): <span className='fw-bold fs-4'>{formatPrice(total)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {cartItemsCounter > 0 &&
                <div className='col-3'>
                    <div className="card">
                        <div className="card-body">
                            <div className='fs-5'>Total ({cartItemsCounter} items): <span className='fw-bold fs-5'>{formatPrice(total)}</span></div>
                            <div className="d-grid">
                                <button type='button' className='btn btn-warning rounded-3 mt-3 mb-4 fw-semibold' onClick={onClickCheckout}>Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
            
    )
}
Cart.displayName = 'Cart'
export default Cart