import React, { useState } from 'react';
import PrimaryButton from '../PrimaryButton/index.js';
import styles from './taginput.css';

const TagInput = () => {
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setTag(e.target.value);
  };

  const handleAddTag = () => {
    if (tag.trim() === '') {
      setError('Tag cannot be empty');
      return;
    }

    setTags([...tags, { tag_id: Date.now(), tag }]);
    setTag('');
    setError('');
  };

  const handleDeleteTag = (tagId) => {
    setTags(tags.filter(tag => tag.tag_id !== tagId));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <div className={`${styles.tagContainer}`}>
     <div className={`${styles.inputsection}`}>
        <input
            type="text"
            value={tag}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a tag"
        />
        <PrimaryButton onClick={handleAddTag} size="Primary-Btn">
            Add Tag
        </PrimaryButton>
     </div>
     
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {tags.map((tag) => (
          <li key={tag.tag_id}>
            {tag.tag} &nbsp;
            <button onClick={() => handleDeleteTag(tag.tag_id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagInput;
