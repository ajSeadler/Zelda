// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h1>The Legend of Zelda</h1>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
