import './App.css';
import React, { useState } from 'react';
import RegisterPage from './Components/RegisterPage';
import LoginPage from './Components/LoginPage';
import TaskPage from './Components/TaskPage';

const App = () => {
    const [page, setPage] = useState('register');

    return (
        <div>
            {page === 'register' && <RegisterPage onSwitchToLogin={() => setPage('login')} />}
            {page === 'login' && <LoginPage onSwitchToRegister={() => setPage('register')} />}
            {page === 'tasks' && <TaskPage />}
            {page !== 'tasks' && (
                <button onClick={() => setPage('tasks')} style={{ marginTop: '20px' }}>
                    Go to Task Page
                </button>
            )}
        </div>
    );
};

export default App;
