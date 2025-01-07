import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import './CreateTaskPage.css';

const CreateTaskPage = () => {
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
                } else {
                    alert('Failed to create task!');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleUserSelection = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
        setSelectedUsers(users.filter((user) => value.includes(user.id)));
    };

    return (
        <div className="create-task-container">
            <h2 className="create-task-title">Create Task</h2>
            <form onSubmit={handleCreateTask} className="create-task-form">
                <div className="form-group">
                    <label>Task Name:</label>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Assign Users:</label>
                    <select
                        multiple
                        value={selectedUsers.map((user) => user.id)}
                        onChange={handleUserSelection}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submit-button">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTaskPage;
