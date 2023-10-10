import React from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import GameList from "./components/GamesList";
import GameDetailPage from "./components/GameDetailsPage";
import DungeonList from './components/DungeonList'; 
import Monsters from './components/Monsters'; 
import Equipment from "./components/Equipment"
import { ScrollToTop } from 'react-scroll-to-top';
import "./index.css";
import "./app.css";

function HomePage() {
  const navigate = useNavigate();

  const handleShowGames = () => {
    navigate("/games");
  };

  const handleShowDungeons = () => {
    navigate("/dungeons");
  };

  const handleShowMonsters = () => {
    navigate("/monsters");
  };

  const handleShowEquipment = () => {
    navigate("/equipment"); // Add a function to navigate to the Equipment page
  };

  return (
    <>
      <h1 style={{ color: "#ccba80", fontSize: "2.4rem",}}>The Legend of <br></br>Zelda</h1>

      <div className="button-container">
          <button className="show-games-button" onClick={handleShowGames}>
            <span>Games</span>
          </button>
          
          <button className="show-games-button-1" onClick={handleShowMonsters}>
            <span>Monsters</span>
          </button>
          <button className="show-games-button-2" onClick={handleShowEquipment}>
            <span>Equipment</span>
          </button>
          <button className="show-games-button-2" onClick={handleShowDungeons}>
            <span>Dungeons</span>
          </button>
        </div>
      <div className="center-container">
        <div id="triforce">
          <div id="triangle" className="shadow">
            <div id="shadow"></div>
          </div>
        </div>
       
      </div>
      <footer>
  <p>~under construction~</p>
</footer>

      
    </>
  );
}

function App() {
  return (
<>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/games" element={<GameList />} />
      <Route path="/games/:id" element={<GameDetailPage />} />
      <Route path="/dungeons" element={<DungeonList />} />
      <Route path="/monsters" element={<Monsters />} />
      <Route path="/equipment" element={<Equipment />} /> {/* Add the Equipment route */}
    </Routes>
    </>
  );
}

export default App;
