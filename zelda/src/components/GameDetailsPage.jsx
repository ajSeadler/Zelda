// src/components/GameDetailPage.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`https://zelda.fanapis.com/api/games/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setGame(data.data);
        } else {
          console.error('API did not return a successful response:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching game details:', error);
      });

    // Fetch all characters
    fetch('https://zelda.fanapis.com/api/characters?limit=100')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Filter characters based on appearances in the current game
          const charactersInGame = data.data.filter((character) =>
            character.appearances.includes(`https://zelda.fanapis.com/api/games/${id}`)
          );
          setCharacters(charactersInGame);
        } else {
          console.error('API did not return a successful response for characters:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
      });
  }, [id]);

  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-detail-page">
      <h2>{game.name}</h2>
      <p>{game.description}</p>
      <p>Developer: {game.developer}</p>
      <p>Publisher: {game.publisher}</p>
      <p>Released Date: {game.released_date}</p>
      <div className="back-button">
        <Link to="/games">Back to Games</Link>
      </div>

      {/* Display characters for the current game */}
      <div className="characters-list">
        <h3>Characters:</h3>
        <ul>
          {characters.map((character) => (
            <li key={character.id}>{character.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GameDetailPage;
