import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import CreateTaskPage from './CreateTaskPage';
import './TaskPage.css';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна

    useEffect(() => {
        fetch(`${API_BASE_URL}/Task`)
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="container">
            <button 
                onClick={handleOpenModal} 
                className="create-task-button"
            >
                Create New Task
            </button>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Task List</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        <h3 className="task-title">Название: {task.name}</h3>
                        <p className="task-description">Описание: {task.description}</p>
                        <p className="task-executors">
                            Assigned to: {task.executors?.join(', ') || 'No executors'}
                        </p>
                    </li>
                ))}
            </ul>

            {/* Модальное окно */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button 
                            onClick={handleCloseModal} 
                            className="close-modal-button"
                        >
                            ✕
                        </button>
                        <CreateTaskPage />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
