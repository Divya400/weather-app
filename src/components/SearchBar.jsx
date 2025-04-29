import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "0.5rem", fontSize: "1rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem", fontSize: "1rem" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
