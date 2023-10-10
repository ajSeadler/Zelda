import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Monsters() {
  const [monsters, setMonsters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const monstersPerPage = 15; // Number of monsters to display per page

  useEffect(() => {
    fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters"
    )
      .then((response) => response.json())
      .then((data) => setMonsters(data.data));
  }, []);

  // Filter monsters based on the search term
  const filteredMonsters = monsters
    .filter((monster) => {
      const name = monster.name.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      // Check if the monster's name starts with the search term
      return name.startsWith(searchTermLower);
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Calculate the indexes of the monsters to display on the current page
  const indexOfLastMonster = currentPage * monstersPerPage;
  const indexOfFirstMonster = indexOfLastMonster - monstersPerPage;
  const currentMonsters = filteredMonsters.slice(
    indexOfFirstMonster,
    indexOfLastMonster
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop(); // Scroll to top when a page button is clicked
  };

  // Function to scroll to the top
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="character-list">
      <h2>Monsters</h2>
      <p>From: Breath of the Wild</p>
      <Link to="/" style={{ margin: "15px" }}>
        Back to Home
      </Link>

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
        {currentMonsters.map((monster) => (
          <li key={monster.id}>
            <h3>{monster.name}</h3>
            <p>{monster.description}</p>

            <img src={monster.image} alt={monster.name} />
            <h4>
              Common Locations:{" "}
              {monster.common_locations &&
                monster.common_locations.map((location, index) => (
                  <span key={index}>
                    {index > 0 && " "}
                    {location}
                  </span>
                ))}
            </h4>
            <h5>
              Common Drops:{" "}
              {monster.drops &&
                monster.drops.map((location, index) => (
                  <span key={index}>
                    {index > 0 && " "}
                    {location}
                  </span>
                ))}
            </h5>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredMonsters.length / monstersPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <Link to="/" style={{ margin: "15px" }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Monsters;
