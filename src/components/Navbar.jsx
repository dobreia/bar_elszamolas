import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='navbar'>
            <Link className='nav-item' to="/">Lányok</Link>
            <Link className='nav-item' to="/girlsName">Lányok nevei</Link>
        </div>
    )
}

export default Navbar
