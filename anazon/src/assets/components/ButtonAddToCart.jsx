import React, { useContext } from 'react'
import StateContext from './StateContext';
import Swal from 'sweetalert2';
import '../css/toasts.css' 

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast',
    },
  });

const ButtonAddToCart = (props) => {
    const { productId } = props
    const { cart, setCart, cartItemsCounter, setCartItemsCounter } = useContext(StateContext);

    const onClickAdd = (e) => {
        const updatedCart = [...cart, {id: productId}];
        const updatedCartItems = cartItemsCounter + 1;
        const product = cart.find(product => product.id ==  productId);

        if(product) Toast.fire({title: "This item already exists in the cart.", icon: "info"});
        else{
            setCart(updatedCart);
            setCartItemsCounter(prev => (prev + 1))
            localStorage.setItem('dataCart', JSON.stringify(updatedCart));
            localStorage.setItem('dataCartCounter', JSON.stringify(updatedCartItems));
            Toast.fire({title: "Product added to cart.", icon: "success"});
        }
    }

    return (
        <>
            <button type='button' className='btn btn-warning rounded-pill mt-2 fw-semibold' value={productId} onClick={onClickAdd}>Add to cart</button>
        </>
    )
}
ButtonAddToCart.displayName = 'ButtonAddToCart'
export default ButtonAddToCart