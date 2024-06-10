import React from 'react'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars';
import Price from './Price';
import ButtonAddToCart from './ButtonAddToCart';

const PreviewProduct = (props) => {  
    const {product} = props
    return (
        <>
            <div className="col mb-3">
                <div className="card h-100 border border-opacity-10 rounded-1">
                    <div className="card-body">
                        <Link to={'/products/' + product.id} className='text-decoration-none text-black' >
                            <img src={product.thumbnail} alt={product.title} width={150} loading='lazy' className='mx-auto d-block' />
                        </Link>
                        <h5 className="card-title"><Link to={'/products/' + product.id} className='text-decoration-none text-black' >{product.title}</Link></h5>
                        <RatingStars rating={product.rating} reviews={product.reviews.length} />
                        <Link to={'/products/' + product.id} className='text-decoration-none text-black' >
                            <p><Price price={product.price} discountPercentage={product.discountPercentage} /></p>
                        </Link>
                        <ButtonAddToCart productId={product.id}/>
                    </div>
                </div>
            </div>
        </>
    )
}
PreviewProduct.displayName = 'PreviewProduct'
export default PreviewProduct