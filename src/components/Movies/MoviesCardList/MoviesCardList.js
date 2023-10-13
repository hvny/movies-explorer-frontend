import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function MoviesCardList(props) {
    const location = useLocation();
    //const [isPreloader, setIsPreloader] = useState(props.isLoading);
    const containerSelectorSaved = location.pathname === "/saved-movies" ? "cards_saved" : "";
    const containerSelectorDefault = location.pathname === "/movies" && props.movies.length === 0 && !props.searchError ? "cards_empty" : "";

    // useEffect(()=> {
    //     if (props.isLoading === true) {
    //         setIsPreloader(true);
    //     }
    //     else {
    //         setTimeout(() => {
    //             setIsPreloader(false);
    //         }, 100);
    //     }
    // }, [props.isLoading]);

    return (
        <section className={`cards ${containerSelectorSaved} ${containerSelectorDefault}`}>
            {//isPreloader ? <Preloader/> : 
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
                            searchReq = {props.searchReq}
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
                            searchReq = {props.searchReq}
                        />
                    ))
                    )
                }
            </ul>}
        </section>
    );
}

export default MoviesCardList;
