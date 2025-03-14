import { useState } from "react";
import styles from "./PromptForm.module.css";

export default function PromptForm({ onSubmit, isLoading }) {
  const [prompt, setPrompt] = useState("");
  const [tags, setTags] = useState([]);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [negativeTags, setNegativeTags] = useState([]);

  const handleKeyDown = (e, setPrompt, setTags, tags) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setTags([...tags, e.target.value.trim()]);
      setPrompt("");
    }
  };

  const removeTag = (indexToRemove, setTags, tags) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags.length > 0 || negativeTags.length > 0) {
      onSubmit(tags, negativeTags);
      setTags([]);
      setNegativeTags([]);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Enter things you like to receive:
        <input
          className={styles.input}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, setPrompt, setTags, tags)}
        />
      </label>
      <div className={styles.tags}>
        {tags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}
            <button type="button" onClick={() => removeTag(index, setTags, tags)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <label>
        Enter things you don't want to receive:
        <input
          className={styles.input}
          type="text"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, setNegativePrompt, setNegativeTags, negativeTags)}
        />
      </label>
      <div className={styles.tags}>
        {negativeTags.map((tag, index) => (
          <div key={index} className={styles.tag}>
            {tag}
            <button type="button" onClick={() => removeTag(index, setNegativeTags, negativeTags)}>
              &times;
            </button>
          </div>
        ))}
      </div>
      <button className={styles.submitButton} type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
}