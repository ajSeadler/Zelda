import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DungeonList() {
  const [dungeons, setDungeons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch the list of dungeons from your API
    fetch('https://zelda.fanapis.com/api/dungeons?limit=300')
      .then((response) => response.json())
      .then((data) => setDungeons(data.data));
  }, []);

  // Filter dungeons based on the search term
  const filteredDungeons = dungeons.filter((dungeon) =>
    dungeon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="character-list"> {/* Apply the same CSS class name */}
      <h2>Dungeons</h2>
      <Link to="/" style={{ margin: '15px' }}>Back to Home</Link>


      {/* Add the search input field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search dungeons..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <ul>
        {filteredDungeons.map((dungeon) => (
          <li key={dungeon._id}>
            <h3>{dungeon.name}</h3>
            <p>{dungeon.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DungeonList;
