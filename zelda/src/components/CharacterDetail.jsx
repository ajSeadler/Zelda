// src/components/CharacterDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CharacterDetail() {
  const { characterId } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    // Fetch the character details based on the characterId
    fetch(`https://zelda.fanapis.com/api/characters/${characterId}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data.data));
  }, [characterId]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className="character-detail">
      <h2>{character.name}</h2>
      <p>{character.description}</p>
      <Link to="/characters">Back to Characters</Link>
    </div>
  );
}

export default CharacterDetail;
