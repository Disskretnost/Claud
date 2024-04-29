import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Добавляем поле для подтверждения пароля
    const [username, setUsername] = useState(''); // Добавляем поле для имени пользователя
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) { // Проверяем, что пароли совпадают
            alert('Пароли не совпадают');
            return;
        }
        const userData = {
            "email": email,
            "password": password,
            "username": username // Добавляем имя пользователя в данные пользователя
        };

        try {
            const response = await fetch('/api/user/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }

            const data = await response.json();
            console.log(data);

            navigate('/login');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    return (
        <div className="container">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Signup</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <input type="submit" className="button" value="Signup" />
                </form>
                <div className="signup">
                    <span className="signup">Already have an acount?
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </div>
            {/* Удалено для упрощения */}
        </div>
    );
};

export default LoginPage;
