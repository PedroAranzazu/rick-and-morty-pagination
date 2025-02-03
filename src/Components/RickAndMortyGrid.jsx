import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; // 

const RickAndMortyGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1); // Estado para la página actual
  const [totalPages, setTotalPages] = useState(1); // Estado para el total de páginas

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => {
        setCharacters(response.data.results); // Establecer los personajes de la página actual
        setTotalPages(response.data.info.pages); // Establecer el total de páginas
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [page]); // La petición se vuelve a realizar cuando cambia la página

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1); //                    Cambiar a la siguiente página
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); //                  Cambiar a la página anterior
    }
  };

  return (
    <div>
      <div className="container">
        {characters.map((char) => (
          <div className="card" key={char.id}>
            <img src={char.image} alt={char.name} className="character-image" />
            <div className="info">
              <h2>{char.name}</h2>
              <p>
                <strong>Status:</strong> {char.status}
              </p>
              <p>
                <strong>Last known location:</strong> {char.location.name}
              </p>
              <p>
                <strong>First seen in:</strong> {char.origin.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default RickAndMortyGrid;