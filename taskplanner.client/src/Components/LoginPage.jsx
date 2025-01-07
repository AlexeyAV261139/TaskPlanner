import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

const LoginPage = ({ onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            login: username, // из состояния
            password: password, // из состояния
        };
    
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
            });
    
            if (response.ok) {
                alert("Login successful!");
            } else {
                const error = await response.json();
                console.error("Error:", error);
                alert("Login failed!");
            }
        } catch (err) {
            console.error("Network error:", err);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%' }}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <button onClick={onSwitchToRegister} style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}>Register here</button>
            </p>
        </div>
    );
};

export default LoginPage;