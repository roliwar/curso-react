import React from 'react';
import { NavLink } from 'react-router-dom'
import '../App.css'

const links = [
    {
        name: 'Home',
        href: '/'
    },
    {
        name: 'Nueva entrada',
        href: '/new-post'
    }
];

const NavBar = () => {
    return (
        <>
            {
                links.map((item) => (
                    <NavLink key={item.href} to={item.href}>{item.name}</NavLink>
                ))
            }
        </>
    );
};

NavBar.displayName = 'NavBar'
export default NavBar;
