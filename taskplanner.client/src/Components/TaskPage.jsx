import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import CreateTaskPage from './CreateTaskPage';
import EditTaskPage from './EditTaskPage'; // Импортируем компонент редактирования
import './TaskPage.css';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Для модального окна создания задачи
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Для модального окна редактирования задачи
    const [selectedTaskId, setSelectedTaskId] = useState(null); // ID выбранной задачи для редактирования

    useEffect(() => {
        fetch(`${API_BASE_URL}/Task/GetAll`)
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const handleOpenCreateModal = () => setIsCreateModalOpen(true);
    const handleCloseCreateModal = () => setIsCreateModalOpen(false);

    const handleOpenEditModal = (taskId) => {
        setSelectedTaskId(taskId); // Сохраняем ID выбранной задачи
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedTaskId(null); // Сброс ID при закрытии модалки
    };

    return (
        <div className="container">
            <button onClick={handleOpenCreateModal} className="create-task-button">
                Create New Task
            </button>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Task List</h2>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item" onClick={() => handleOpenEditModal(task.id)}>
                        <h3 className="task-title">Название: {task.name}</h3>
                        <p className="task-description">Описание: {task.description}</p>
                        <p className="task-executors">
                            Assigned to: {task.executors?.join(', ') || 'No executors'}
                        </p>
                    </li>
                ))}
            </ul>

            {/* Модальное окно для создания задачи */}
            {isCreateModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button onClick={handleCloseCreateModal} className="close-modal-button">✕</button>
                        <CreateTaskPage />
                    </div>
                </div>
            )}

            {/* Модальное окно для редактирования задачи */}
            {isEditModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <button onClick={handleCloseEditModal} className="close-modal-button">✕</button>
                        <EditTaskPage taskId={selectedTaskId} onClose={handleCloseEditModal} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
