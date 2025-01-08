import React, { useState } from 'react';
import './MainPage.css';
import TaskPage from '../TaskPage/TaskPage';
//import EmployeesPage from './Components/EmployeesPage';

const MainPage = () => {
    const [activeTab, setActiveTab] = useState('tasks'); // Default tab is "tasks"

    const renderContent = () => {
        switch (activeTab) {
            case 'tasks':
                return <TaskPage />;
            case 'employees':
                return ;//тут вставить сотрудников
            default:
                return <div>Select a tab from the navigation panel.</div>;
        }
    };

    return (
        <div className="main-page">
            <nav className="sidebar">
                <ul>
                    <li
                        className={activeTab === 'tasks' ? 'active' : ''}
                        onClick={() => setActiveTab('tasks')}
                    >
                        Задачи
                    </li>
                    <li
                        className={activeTab === 'employees' ? 'active' : ''}
                        onClick={() => setActiveTab('employees')}
                    >
                        Сотрудники
                    </li>
                </ul>
            </nav>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default MainPage;
