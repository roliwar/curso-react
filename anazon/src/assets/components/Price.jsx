import React from 'react'

const getFractional = (price) => {
    const fractional = parseFloat((price - Math.floor(price)).toFixed(10))
    return ('' + fractional).replace("0.", "");
};
const getListPrice = (price, discountPercentage) => {
    const discountPer = discountPercentage / 100
    const listPrice = price * (1 + discountPer)
    return parseFloat(listPrice.toFixed(2));
};

const Price = (props) => {
    const { price, discountPercentage, showPriceList=true } = props
    return (
        <>
            <span className='fs-2 fw-semibold'><sup className='me-1' style={{fontSize: '55%'}}>$</sup>
            {parseInt(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            <span className='fs-2'><sup style={{fontSize: '55%'}}>{getFractional(price)}</sup></span>
            {showPriceList &&
                <span className='ps-2 text-muted'>List price:&nbsp;
                    <span className='text-decoration-line-through'>${getListPrice(price, discountPercentage)}</span>
                </span>
            }
        </>
    )
}
Price.displayName = 'Price'
export default Price