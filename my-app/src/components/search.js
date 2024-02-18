import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input 
      className="w-100 h-100"
      type="text"
      placeholder="Search for"       
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default SearchBar;