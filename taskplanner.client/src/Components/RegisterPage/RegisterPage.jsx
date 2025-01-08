import React, { useState } from 'react';
import { API_BASE_URL } from '../../config';
import './RegisterPage.css';

const RegisterPage = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
            login: username, // из состояния
            password: password, // из состояния
            role: "User", // Задайте роль пользователя, например "User",
            name: name
        };
    
        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                alert("Registration successful!");
            } else {
                try {
                    const error = await response.json();
                    console.error("Error:", error);
                    alert("Registration failed!");
                } catch {
                    alert("Registration failed with no additional details.");
                }
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    return (
        <div class="register-form" style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Регистрация</h2>
            <form onSubmit={handleRegister}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Логин:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Имя:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>
                Аккаунт уже существует? <button onClick={onSwitchToLogin} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Войти тут</button>
            </p>
        </div>
    );
};

export default RegisterPage;
