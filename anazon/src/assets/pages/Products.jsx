import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons'
import RatingStars from '../components/RatingStars';
import Price from '../components/Price';
import ButtonAddToCart from '../components/ButtonAddToCart';
import StateContext from '../components/StateContext';

const Products = () => {
    const { products} = useContext(StateContext);
    const {id} = useParams()
    const product = products.find(product => product.id ==  id);

    return (
        <>
            <div className='pb-3'>
                <Link to='/' className='text-decoration-none'>
                    <FontAwesomeIcon icon={faAnglesLeft}  size="sm" /> Back
                </Link>
            </div>
            <div className='row'>
                <div className='col-xs-4 col-sm-4 col-md-4 col-lg-4 pb-3'>
                    <img src={product.images[0]} width={400} alt={product.title} loading='lazy' className='mx-auto d-block border border-1 bg-white img-fluid' />
                </div>
                <div className='col-xs-4 col-sm-4 col-md-5 col-lg-6'>
                    
                    <div className="border-dark border-bottom border-opacity-25 mb-3">
                        <h3>{product.title}</h3>
                        <span>
                            {product.description}
                        </span>
                        
                        <RatingStars rating={product.rating} reviews={product.reviews.length} />
                    </div>
                    <div>
                        <p className='mb-0'><span className="badge text-bg-danger fs-6 rounded-1">Discount</span></p>
                        <p><span className="fs-3 fw-lighter me-2 text-danger">-{parseInt(product.discountPercentage)}%</span>
                            <Price price={product.price} discountPercentage={product.discountPercentage} />
                        </p>
                    </div>
                    <div>
                        {product.brand && 
                        <div className="row mb-1">
                            <b>Brand</b>
                            <div className="col-sm-10">
                                {product.brand}
                            </div>
                        </div>}
                        <div className="row mb-3">
                            <b>Warranty</b>
                            <div className="col-sm-10">
                                {product.warrantyInformation}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xs-4 col-sm-4 col-md-3 col-lg-2'>
                    <div className="card">
                        <div className="card-body">
                            <Price price={product.price} discountPercentage={product.discountPercentage} showPriceList={false}/>
                            <div className="text-success mb-3">FREE Returns for Mexico</div>
                            <div>No imports charges</div>
                            <div className='mb-2'><FontAwesomeIcon icon={faLocationDot} size="sm" style={{color: '#DF3030'}}/><span className="small text-success"> Deliver to Mexico</span></div>
                            {product.stock > 0 &&
                            <div className='fs-5 text-success'>
                                In Stock
                                <br />
                                <ButtonAddToCart productId={product.id} />
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Products.displayName = 'Entradas'
export default Products