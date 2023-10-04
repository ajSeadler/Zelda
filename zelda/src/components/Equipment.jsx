import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Equipment() {
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const equipmentPerPage = 20; // Number of equipment items to display per page

  useEffect(() => {
    fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/category/equipment"
    )
      .then((response) => response.json())
      .then((data) => setEquipment(data.data));
  }, []);

  // Filter equipment based on the search term
  const filteredEquipment = equipment
    .filter((item) => {
      const name = item.name.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      // Check if the equipment item's name contains the search term
      return name.includes(searchTermLower);
    })
    .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Calculate the indexes of the equipment items to display on the current page
  const indexOfLastEquipment = currentPage * equipmentPerPage;
  const indexOfFirstEquipment = indexOfLastEquipment - equipmentPerPage;
  const currentEquipment = filteredEquipment.slice(
    indexOfFirstEquipment,
    indexOfLastEquipment
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="character-list">
      <h2>Equipment</h2>
      <p>From: Breath of the Wild</p>
      <Link to="/" style={{ margin: "15px" }}>
        Back to Home
      </Link>

      {/* Add the search input field */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search equipment..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <ul>
        {currentEquipment.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <img src={item.image} alt={item.name} />
            <p>{item.description}</p>
            <h4>
              Common Locations:{" "}
              {item.common_locations &&
                item.common_locations.map((location, index) => (
                  <span key={index}>
                    {index > 0 && " "}
                    {location}
                  </span>
                ))}
            </h4>
            <h5>
              Attack: {item.properties.attack}
            </h5>
            <h5>
              Defense: {item.properties.defense}
            </h5>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredEquipment.length / equipmentPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Equipment;
