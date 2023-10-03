// src/components/CharacterList.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the list of characters from your API
    fetch('https://zelda.fanapis.com/api/characters?limit=200')
      .then((response) => response.json())
      .then((data) => setCharacters(data.data));
  }, []);

  // Filter characters based on the search term
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="character-list">
      <h2>Characters</h2>
      <Link to="/" style={{ margin: '15px' }}>Back to Home</Link>
      {/* Add the search input field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search characters..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <ul>
        {filteredCharacters.map((character) => (
          <li key={character._id}>
            <h3>{character.name}</h3>
            <p>{character.description}</p>
          </li>
        ))}
      </ul>

      <Link to="/" style={{ margin: '3px' }}>Back to Home</Link>
    </div>
  );
}

export default CharacterList;
