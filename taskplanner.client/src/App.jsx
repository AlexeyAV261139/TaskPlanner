import './App.css';
import React, { useState } from 'react';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import LoginPage from './Components/LoginPage/LoginPage';
import MainPage from './Components/MainPage/MainPage';

const App = () => {
    const [page, setPage] = useState('register');

    return (
        <div>
            {page === 'register' && <RegisterPage onSwitchToLogin={() => setPage('login')} />}
            {page === 'login' && <LoginPage onSwitchToRegister={() => setPage('register')} />}
            {page === 'main' && <MainPage />}           
            {page !== 'main' && (
                <button onClick={() => setPage('main')} style={{ marginTop: '-80px', position: 'absolute', marginLeft: '-400px' }}>
                    Главная
                </button>
            )}
        </div>
    );
};

export default App;
