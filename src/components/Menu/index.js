import React from 'react';
import { Link } from 'react-router-dom'; 
import './index.css'; 

const Menu = () => {
    return (
        <nav className="menu">
            <ul className="menu-list">
                <li className="menu-item">
                    <Link to="/login" className="menu-link">Login</Link>
                </li>
                <li className="menu-item">
                    <Link to="/" className="menu-link">Cadastro</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
