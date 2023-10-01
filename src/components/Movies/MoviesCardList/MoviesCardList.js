import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function MoviesCardList(props) {
    const location = useLocation();
    const containerSelector = location.pathname === "/saved-movies" ? "cards_saved" : "";

    return (
        <section className={`cards ${containerSelector}`}>
            <ul className="cards__list">
                {location.pathname === "/movies" ? (
                    props.isLoading ? <Preloader/> :
                    props.movies.map((movie, i) => (
                        i < props.moviesQuantity &&
                        <MoviesCard 
                            movie={movie} 
                            key={movie.movieId}
                            onSave={props.onSave}
                            onDelete={props.onDelete}
                            savedMovies={props.savedMovies}
                        />
                    ))
                ) : (
                    props.isLoading ? <Preloader/> :
                    props.savedMovies.map((movie) => (
                        <MoviesCard 
                            movie={movie} 
                            key={movie.movieId} 
                            onSave={props.onSave}
                            onDelete={props.onDelete}
                            savedMovies={props.savedMovies}
                        />
                    ))
                )}
            </ul>
        </section>
    );
}

export default MoviesCardList;
