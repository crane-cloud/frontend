import React, { useState } from "react";
import styles from "./TagInput.module.css";

const TagInput = ({ suggestions }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      if (!tags.includes(input)) {
        setTags([...tags, input]);
      }
      setInput("");
      setFilteredSuggestions([]);
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSuggestionClick = (suggestion) => {
    if (!tags.includes(suggestion)) {
      setTags([...tags, suggestion]);
    }
    setInput("");
    setFilteredSuggestions([]);
  };

  return (
    <div className={styles.tagInputContainer}>
      <div className={styles.tagList}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}
            <button onClick={() => handleTagRemove(index)}>x</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      {filteredSuggestions.length > 0 && (
        <div className={styles.suggestions}>
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;