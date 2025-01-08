import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../config';
import './CreateTaskPage.css';
import '../TagManager/TagManager';
import TagManager from '../TagManager/TagManager';


const CreateTaskPage = ({ onTaskCreated }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Запрос пользователей с сервера
        fetch(`${API_BASE_URL}/User`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data); // Предполагается, что API возвращает массив объектов { id, name }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
                alert('Failed to load users.');
            });
    }, []); // Выполнить только при первом рендере

    const handleCreateTask = (e) => {
        e.preventDefault();
        console.log('Creating task:', { taskName, description, selectedUsers });
        fetch(`${API_BASE_URL}/Task`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: taskName,
                description,
                executorIds: selectedUsers.map((user) => user.id),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    alert('Task created successfully!');
                    setTaskName('');
                    setDescription('');
                    setSelectedUsers([]);
                    if (onTaskCreated) onTaskCreated();
                } else {
                    alert('Failed to create task!');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleUserSelection = (e, user) => {
        if (e.target.checked) {
            // Добавляем пользователя в список выбранных
            setSelectedUsers((prevUsers) => [...prevUsers, user]);
        } else {
            // Убираем пользователя из списка выбранных
            setSelectedUsers((prevUsers) => prevUsers.filter((selectedUser) => selectedUser.id !== user.id));
        }
    };

    return (
        <div className="create-task-container">
            <h2 className="create-task-title">Создание задачи</h2>
            <TagManager/>
            <form onSubmit={handleCreateTask} className="create-task-form">
                <div className="form-group">
                    <label>Название:</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Исполнители:</label>
                    <div className="user-checkbox-container">
                        {users.map((user) => (
                            <div key={user.id} className="user-checkbox-item">
                                <input
                                    type="checkbox"
                                    id={`user-${user.id}`}
                                    value={user.id}
                                    checked={selectedUsers.some((selectedUser) => selectedUser.id === user.id)}
                                    onChange={(e) => handleUserSelection(e, user)}
                                />
                                <label htmlFor={`user-${user.id}`} className="user-name">{user.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" className="submit-button">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTaskPage;
