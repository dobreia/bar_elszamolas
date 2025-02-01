import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'


const Navbar = () => {
    return (
        <div className='navbar'>
            <NavLink className='nav-item' to="/">Lányok</NavLink>
            <NavLink className='nav-item' to="/girlsName">Lányok nevei</NavLink>
            <NavLink className='nav-item' to="/services">Szolgáltatások</NavLink>
            <NavLink className='nav-item' to="/barCounter">Pult</NavLink>

        </div>
    )
}

export default Navbar
