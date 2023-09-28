import "./MoviesCard.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
    const [isSaved, setIsSaved] = useState(false);
    const location = useLocation();
    const saveCardButton = location.pathname === "/movies" && isSaved === false ? 
    `movie-card__button button movie-card__button_save` :
    `movie-card__button button ${location.pathname === "/movies" ? "movie-card__button_saved" : "movie-card__button_delete"}`; 

    function handleSaveCard() {
        setIsSaved(!isSaved);
    }

    function setDuration(duration) {
        const minutes = duration % 60;
        const hours = (duration-minutes)/60;
        const totalDuration = "" + hours.toString() + "ч " + (minutes < 10 ? "0" : "") + minutes.toString()  + "м";
        return totalDuration;
    }

    return (
        <li className="movie-card">
            <button type="button" className={saveCardButton} onClick={handleSaveCard} />
            <img src={props.movie.image.url} alt = {props.movie.nameRU} className="movie-card__image" />
            <h2 className="movie-card__title">{props.movie.nameRU}</h2>
            <p className="movie-card__duration">{setDuration(props.movie.duration)}</p>
        </li>
    );
}

export default MoviesCard;