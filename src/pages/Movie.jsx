import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import MovieCard from "../components/MovieCard";

import "./Movie.css";
import { useDragScroll } from "../hooks/useDragScroll";

// Atualize com os valores reais
const moviesURL = "https://api.themoviedb.org/3/movie/";
const apiKey = "api_key=f1e261c497ddec75f0db9740e335d0ec";

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailers, setTrailers] = useState([]);
  const {
    sliderRef,
    onMouseDown,
    onTouchStart,
    onMouseMove,
    onTouchMove,
    onMouseUp,
    onTouchEnd,
  } = useDragScroll();

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const getTrailers = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setTrailers(data.results || []);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, [id]);

  useEffect(() => {
    const trailerUrl = `${moviesURL}${id}/videos?${apiKey}`;
    getTrailers(trailerUrl);
  }, [id]);

  return (
    <div className="movie-page">
      {!movie && (
        <p className="movie-loading">Carregando filme...</p>
      )}
      {movie && (
        <>
          <div className="container-content">
            <MovieCard movie={movie} showLink={false} />

            <div className="info-grid">
              <p className="tagline">{movie.tagline}</p>
              <div className="info-box">
                <div className="info-header">
                  <BsWallet2 className="info-icon" />
                  <h3>Orçamento</h3>
                </div>
                <div className="info-content">
                  <p>{formatCurrency(movie.budget)}</p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-header">
                  <BsGraphUp className="info-icon" />
                  <h3>Receita</h3>
                </div>
                <div className="info-content">
                  <p>{formatCurrency(movie.revenue)}</p>
                </div>
              </div>

              <div className="info-box">
                <div className="info-header">
                  <BsHourglassSplit className="info-icon" />
                  <h3>Duração</h3>
                </div>
                <div className="info-content">
                  <p>{movie.runtime} minutos</p>
                </div>
              </div>

              <div className="info-box description-box">
                <div className="info-header">
                  <BsFillFileEarmarkTextFill className="info-icon" />
                  <h3>Sinopse</h3>
                </div>
                <div className="info-content">
                  <p className="description-text">{movie.overview}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Renderização de Trailers */}
          <h2>Trailers</h2>
          <div
            className="trailer-container"
            ref={sliderRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onMouseUp={onMouseUp}
            onTouchEnd={onTouchEnd}
            style={{ cursor: "grab" }}
          >
            {trailers.length > 0 ? (
              trailers.map((trailer) => (
                <>
                  <div>
                    <iframe
                      key={trailer.id}
                      width="560"
                      height="315"
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title={trailer.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <p className="title-trailer">{trailer.name}</p>
                  </div>
                </>
              ))
            ) : (
              <p>Nenhum trailer disponível.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;
