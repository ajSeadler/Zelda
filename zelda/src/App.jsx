import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import GameList from "./components/GamesList";
import GameDetailPage from "./components/GameDetailsPage";
// import CharacterList from "./components/CharacterList"; // Import the CharacterList component
import DungeonList from './components/DungeonList'; // Import DungeonList component
import Monsters from './components/Monsters'; // Import Monsters component

import "./index.css";
import "./app.css";

function HomePage() {
  const navigate = useNavigate(); // Get the navigate function

  const handleShowGames = () => {
    // Redirect to the games page when the button is clicked
    navigate("/games");
  };

  // const handleShowCharacters = () => {
  //   navigate("/characters");
  // };

  const handleShowDungeons = () => {
    navigate("/dungeons");
  };

  const handleShowMonsters = () => {
    navigate("/monsters");
  };

  return (
    <>
      <h1 className="Z">The Legend of Zelda</h1>

      <div className="center-container">
        {/* Wrap everything in a centering container */}
        <div id="triforce">
          <div id="triangle" className="shadow">
            <div id="shadow"></div>
          </div>
        </div>
        <div className="button-container">
          <button className="show-games-button" onClick={handleShowGames}>
            <span>Games</span>
          </button>
          {/* <button className="show-games-button-1" onClick={handleShowCharacters}>
            <span>Characters</span>
          </button> */}
          <button className="show-games-button-2" onClick={handleShowDungeons}>
            <span>Dungeons</span>
          </button>
          <button className="show-games-button-1" onClick={handleShowMonsters}>
            <span>Monsters</span>
          </button>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GameList />} />
      <Route path="/games/:id" element={<GameDetailPage />} />
      {/* <Route path="/characters" element={<CharacterList />} /> */}
      <Route path="/dungeons" element={<DungeonList />} />
      <Route path="/monsters" element={<Monsters />} />
    </Routes>
  );
}

export default App;
