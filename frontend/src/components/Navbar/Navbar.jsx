// Navbar.jsx
import React from 'react';
import './Navbar.css'; // Импортируем стили

const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar"> {/* Применяем класс .navbar */}
            <div className="navbar-content"> {/* Добавляем контейнер для содержимого */}
                <h1>Claud Web</h1>
                <button onClick={onLogout}>Log out</button>
            </div>
        </nav>
    );
};

export default Navbar;
