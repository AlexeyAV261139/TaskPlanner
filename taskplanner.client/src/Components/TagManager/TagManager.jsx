import React, { useState } from "react";
import "./TagManager.css";
import { API_BASE_URL } from '../../config';

const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddTag = async () => {
    if (tagName.trim() === "") return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/Tag`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: tagName.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }      
      setTagName("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tag-manager">
      <h2>Создание тега</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Введите тег"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleAddTag} disabled={loading}>
          {loading ? "Добавление..." : "Добавить"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul className="tag-list">
        {tags.map((tag, index) => (
          <li key={index} className="tag-item">
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagManager;
