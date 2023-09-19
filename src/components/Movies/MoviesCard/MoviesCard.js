import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
    const [isSaved, setIsSaved] = useState(false);
    const location = useLocation();

    const saveCardButton = location.pathname === "/movies" && isSaved === false ? 
    `movie-card__button button movie-card__button_save` :
    `movie-card__button button ${location.pathname === "/movies" ? "movie-card__button_saved" : "movie-card__button_delete"}`; 
    
    function handleSaveCard() {
        setIsSaved(!isSaved);
    }

    return (
        <li className="movie-card">
            <button type="button" className={saveCardButton} onClick={handleSaveCard} />
            <img src={movie.src} alt = {movie.name} className="movie-card__image" />
            <h2 className="movie-card__title">{movie.name}</h2>
            <p className="movie-card__duration">{movie.duration}</p>
        </li>
    );
}

export default MoviesCard;