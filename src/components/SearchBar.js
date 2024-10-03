import React from 'react';

const SearchBar = ({ setSearch }) => {
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search by title, author, or genre" 
        onChange={handleChange} 
      />
    </div>
  );
};

export default SearchBar;
