import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaLanguage,
  FaStar,
} from "react-icons/fa";

const imageUrl = import.meta.env.VITE_IMG;

import "./MovieCard.css";

const MovieCard = ({ movie, showLink = true }) => {
  return (
    <div className="movie-card">
      <div className="card-header">
        <img
          src={
            movie.poster_path
              ? imageUrl + movie.poster_path
              : "/placeholder-movie.jpg"
          }
          alt={movie.title}
          className="movie-poster"
        />
        <span className="rating">
          <FaStar className="star-icon" /> {movie.vote_average.toFixed(1)}
        </span>
      </div>

      <div className="card-body">
        <h2 className="movie-title">{movie.title}</h2>

        <div className="movie-meta">
          <div className="meta-item">
            <FaCalendarAlt className="meta-icon" />
            <span>{movie.release_date}</span>
          </div>
          <div className="meta-item">
            <FaLanguage className="meta-icon" />
            <span>{movie.original_language.toUpperCase()}</span>
          </div>
        </div>

        {showLink && (
          <Link to={`/movie/${movie.id}`} className="details-btn">
            Detalhes
            <FaArrowRight className="btn-icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
