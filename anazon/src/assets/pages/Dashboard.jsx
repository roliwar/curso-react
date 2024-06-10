import React, { useContext, useState, useEffect, useCallback } from 'react';
import PreviewProduct from '../components/PreviewProduct';
import StateContext from '../components/StateContext';
import carrouselImg from '../images/carrousel.jpg'

const Dashboard = (props) => {
    const { products } = useContext(StateContext);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const itemsPerLoad = 10;

    useEffect(() => {
        setDisplayedProducts(products.slice(0, itemsPerLoad));
    }, [products]);

    const loadMoreProducts = useCallback(() => {
        if (loading || allLoaded) return;
        setLoading(true);

        setTimeout(() => {
            setDisplayedProducts((prev) => {
                const newProducts = products.slice(prev.length, prev.length + itemsPerLoad);
                if (newProducts.length === 0) {
                    setAllLoaded(true);
                }
                return [...prev, ...newProducts];
            });
            setLoading(false);
        }, 1000); // Simulate API call delay
    }, [loading, allLoaded, products]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 100 >= document.documentElement.offsetHeight) {
                loadMoreProducts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMoreProducts]);

    return (
        <>
            <div>
                <img src={carrouselImg} className='img-fluid mb-3' />
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3">
                {displayedProducts.map(item => (
                    <PreviewProduct key={item.id} product={item} />
                ))}
                {loading && (
                    <div className="col-12 text-end">
                        Loading more products...
                    </div>
                )}
            </div>
        </>
    );
};

Dashboard.displayName = 'Dashboard';
export default Dashboard;