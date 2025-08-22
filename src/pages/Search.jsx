import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Failed to fetch searched movies:", error);
      // Optionally, set an error state here to display an error message to the user
    } finally {
      setLoading(false); // Set loading to false after fetch
    }
  };

  useEffect(() => {
    setLoading(true); // Set loading to true when query changes
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {loading && <p>Carregando...</p>}
        {!loading && movies.length === 0 && <p>Nenhum resultado encontrado.</p>}
        {!loading &&
          movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
