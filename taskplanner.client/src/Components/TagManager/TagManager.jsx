import React, { useState } from "react";
import "./TagManager.css";

const TagManager = () => {
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");

  const handleAddTag = () => {
    if (tagName.trim() !== "") {
      setTags([...tags, tagName.trim()]);
      setTagName("");
    }
  };

  return (
    <div className="tag-manager">
      <h2>Tag Manager</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <button onClick={handleAddTag}>Add Tag</button>
      </div>
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
