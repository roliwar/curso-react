import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faFilledStar } from '@fortawesome/free-solid-svg-icons'
import { faStarHalfStroke as faHalfStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons'

const star = {}

const getStar = (starNumber, rating) => {
    if(rating > starNumber - 1 && rating < starNumber) star[starNumber] = faHalfStar
    else if(rating >= starNumber) star[starNumber] = faFilledStar
    else star[starNumber] = faEmptyStar
    return star[starNumber]
}

const RatingStars = (props) => {
    const { rating, reviews } = props
    return (
        <div title={'Rating: ' + rating}>
            <FontAwesomeIcon icon={getStar(1, rating)}  size="lg" style={{color: '#FA9B02'}}/>
            <FontAwesomeIcon icon={getStar(2, rating)}  size="lg" style={{color: '#FA9B02'}}/>
            <FontAwesomeIcon icon={getStar(3, rating)}  size="lg" style={{color: '#FA9B02'}}/>
            <FontAwesomeIcon icon={getStar(4, rating)}  size="lg" style={{color: '#FA9B02'}}/>
            <FontAwesomeIcon icon={getStar(5, rating)}  size="lg" style={{color: '#FA9B02'}}/>
            <span className='ps-2 text-muted' style={{fontSize: 'smaller'}}>{reviews} reviews</span>
        </div>
    )
}
RatingStars.displayName = 'RatingStars'
export default RatingStars