import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../../Preloader/Preloader";

import { useLocation } from "react-router-dom";

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
                        />
                    ))
                ) : (
                    props.movies.map((movie, i) => (
                        <MoviesCard 
                            movie={movie} 
                            key={movie.movieId} 
                            onSave={props.onSave}
                            onDelete={props.onDelete}
                        />
                    ))
                )}
            </ul>
        </section>
    );
}

export default MoviesCardList;
