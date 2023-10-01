import "./MoviesCard.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function MoviesCard(props) {
    const location = useLocation();
    let id;

    const isSaved = (                                   //проверяем, есть ли сохранённые карточки
        props.savedMovies.find((item) => {
            if (item.movieId === props.movie.movieId) {
                id = item._id;
                return true;
            }
            return false;
        })
    )

    let cardButton = location.pathname === "/movies" && !checkIsSaved() ?          //стили кнопки карточки
    `movie-card__button button movie-card__button_save` :
    `movie-card__button button ${location.pathname === "/movies" ? "movie-card__button_saved" : "movie-card__button_delete"}`; 

    function checkIsSaved() {
        if (isSaved !== undefined) {
            return true
        }
        else{ 
            return false;
        }
    }

    function handleSaveCard() {                                 //кнопка карточки
        if (checkIsSaved()) {
            cardButton = `movie-card__button button movie-card__button_save`;
            if (location.pathname === "/movies") {
                props.onDelete(id);
            }
            else {
                props.onDelete(id);
                console.log("id: ", props.movie._id);
                console.log("movie: ", props.movie);
            }
        }
        else {
            props.onSave(props.movie);
        }
    }

    function setDuration(duration) {            //определяем длительность фильма в часах и минутах
        const minutes = duration % 60;
        const hours = (duration-minutes)/60;
        const totalDuration = "" + hours.toString() + "ч " + (minutes < 10 ? "0" : "") + minutes.toString()  + "м";
        return totalDuration;
    }

    return (
        <li className="movie-card" title={props.movie.nameRU}>
            <button type="button" className={cardButton} onClick={handleSaveCard} />
            <a href={props.movie.trailerLink} target="_blank" rel="noreferrer" className="movie-card__trailer-link">
                <img src={`${props.movie.image}`} title={props.movie.nameRU} alt = {`Постер фильма ${props.movie.nameRU}`} className="movie-card__image" />
            </a>
            <h2 className="movie-card__title">{props.movie.nameRU}</h2>
            <p className="movie-card__duration">{setDuration(props.movie.duration)}</p>
        </li>
    );
}

export default MoviesCard;