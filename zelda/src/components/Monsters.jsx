import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Monsters() {
  const [monsters, setMonsters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters')
      .then((response) => response.json())
      .then((data) => setMonsters(data.data));
  }, []);

  // Filter monsters based on the search term
  const filteredMonsters = monsters.filter((monster) =>
    monster.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="character-list">
      <h2>Monsters</h2>
      <p>(From BOTW only)</p>
      <Link to="/" style={{ margin: '15px' }}>Back to Home</Link>

      {/* Add the search input field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search monsters..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <ul>
        {filteredMonsters.map((monster) => (
          <li key={monster.id}>
            <h3>{monster.name}</h3>
            <p>{monster.description}</p>
            <img src={monster.image} alt={monster.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Monsters;
