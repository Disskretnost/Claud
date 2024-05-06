import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Импортируем Link и useNavigate
import './Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState(''); // Изменено на email
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Используем useNavigate для перенаправления

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = {
            "email": email, // Изменено на email
            "password": password
        };

        try {
            const response = await fetch('/api/user/login', {
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
            console.log(data.token);
            localStorage.setItem('token', data.token); // Предполагается, что сервер возвращает токен в поле 'token'
            navigate('/');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    return (
        <div className="container">
            <input type="checkbox" id="check" />
            <div className="login form">
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your email" // Изменено на "Enter your email"
                        value={email} // Изменено на email
                        onChange={(e) => setEmail(e.target.value)} // Изменено на setEmail
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Link to="#">Forgot password?</Link>
                    <input type="submit" className="button" value="Login" />
                </form>
                <div className="signup">
                    <span className="signup">Don't have an account?
                        <Link to="/registration">Signup</Link>
                    </span>
                </div>
            </div>
            <div className="registration form">
                <header>Signup</header>
                <form action="#">
                    <input type="text" placeholder="Enter your email" />
                    <input type="password" placeholder="Create a password" />
                    <input type="password" placeholder="Confirm your password" />
                    <input type="button" className="button" value="Signup" />
                </form>
                <div className="signup">
                    <span className="signup">Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
