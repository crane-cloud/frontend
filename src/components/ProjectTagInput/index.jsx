import React, { useState, useEffect, useRef } from "react";
import styles from "./TagInput.module.css";
import { useTags } from "../../hooks/useTags";
import Spinner from "../Spinner";

const TagInput = ({ userTags, onTagsChange }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const inputRef = useRef(null);

  const {
    data: tagData,
    isPending,
    isRefetching,
    error,
    isSuccess,
    refetch,
  } = useTags(input);

  useEffect(() => {
    if (input && tagData?.data?.data?.length > 0) {
      setFilteredSuggestions(tagData?.data?.data);
    } else {
      setFilteredSuggestions([]);
    }
  }, [input, tagData]);


  useEffect(() => {
    const newtags = [...tags, ...userTags]
    setTags(Array.from(new Set(newtags)));
  }, []);

  useEffect(() => {
    refetch(input);
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input) {
      addTag(input);
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSuggestionClick = (suggestion) => {
    addTag(suggestion.name);
  };
  const handleTagsChange = () => {
    onTagsChange(tags);
  }

  useEffect(() => {
    handleTagsChange()
  }, [tags]);


  return (
    <div className={styles.tagInputContainer}>
      <div className={styles.tagList}>
        {tags?.map((tag, index) => (
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
        placeholder="Type to add a tag..."
        ref={inputRef}
      />

      {error && <div className={styles.error}>Failed to fetch tags</div>}
      {isSuccess && input && (
        <>
          <div className={styles.suggestions}>
            {(isPending || isRefetching) && input && <Spinner />}
            {filteredSuggestions?.slice(0, 6)?.map((suggestion, index) => (
              <div
                key={index}
                className={styles.suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
            {filteredSuggestions.length === 0 &&
              input &&
              !error &&
              !isPending &&
              isSuccess &&
              !isRefetching && (
                <div className={styles.addNewTag} onClick={() => addTag(input)}>
                  Add tag
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default TagInput;
