import React from 'react'
import { useContext } from 'react'
import PreviewProduct from '../components/PreviewProduct';
import StateContext from '../components/StateContext';

const Dashboard = (props) => {
    const { products, setProducts } = useContext(StateContext);
    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
        {
            products.map(item => (
                <PreviewProduct key={item.id} product={item} /> 
            ))
        }
        </div>
    )
}
Dashboard.displayName = 'Dashboard'
export default Dashboard