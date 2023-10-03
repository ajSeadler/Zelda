// src/components/GameDetail.js

import React, { useState } from 'react';

function GameDetail({ game }) {
  const [showCharacters, setShowCharacters] = useState(false);
  const [characters, setCharacters] = useState([]);

  const loadCharacters = () => {
    // Make a fetch request to load characters for this game
    fetch(`https://zelda.fanapis.com/api/games/${game.id}/characters`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCharacters(data.data);
          setShowCharacters(true);
        } else {
          console.error('API did not return a successful response for characters:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  };

  return (
    <div>
      <h2>{game.name}</h2>
      <p>{game.description}</p>
      <p>Developer: {game.developer}</p>
      <p>Publisher: {game.publisher}</p>
      <p>Released Date: {game.released_date}</p>
      <button onClick={loadCharacters}>Characters</button>
      {showCharacters && (
        <div>
          <h3>Characters:</h3>
          <ul>
            {characters.map((character) => (
              <li key={character.id}>{character.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GameDetail;
