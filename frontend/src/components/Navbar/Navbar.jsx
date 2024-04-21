// Navbar.jsx
import React from 'react';
import './Navbar.css'; // Импортируем стили

const Navbar = ({ onLogout }) => {
    return (
        <nav className="navbar"> {/* Применяем класс .navbar */}
            <div className="navbar-content"> {/* Добавляем контейнер для содержимого */}
                <h1>Мой сайт</h1>
                <button onClick={onLogout}>Выйти из аккаунта</button>
            </div>
        </nav>
    );
};

export default Navbar;
