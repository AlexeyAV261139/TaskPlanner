import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import './EditTaskPage.css';

const EditTaskPage = ({ taskId, onClose }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Получаем список пользователей
        fetch(`${API_BASE_URL}/User`)
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching users:', error));

        // Получаем данные существующей задачи для редактирования
        fetch(`${API_BASE_URL}/Task/?id=${taskId}`)
            .then((response) => response.json())
            .then((task) => {
                setTaskName(task.name);
                setDescription(task.description);
                setSelectedUsers(task.executors || []);
            })
            .catch((error) => console.error('Error fetching task data:', error));
    }, [taskId]);

    const handleSaveChanges = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/Task/${taskId}`, {
            method: 'PUT',
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
                    alert('Task updated successfully!');
                    onClose(); // Закрываем форму редактирования
                } else {
                    alert('Failed to update task!');
                }
            })
            .catch((error) => console.error('Error:', error));
    };

    const handleUserSelection = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => parseInt(option.value, 10));
        setSelectedUsers(users.filter((user) => value.includes(user.id)));
    };

    return (
        <div className="edit-task-container">
            <h2 className="edit-task-title">Edit Task</h2>
            <form onSubmit={handleSaveChanges} className="edit-task-form">
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
                <button type="submit" className="submit-button">Save Changes</button>
                <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default EditTaskPage;
