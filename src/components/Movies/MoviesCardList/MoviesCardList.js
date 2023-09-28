import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { cards, savedCards } from "../../../utils/cards";

import { useLocation } from "react-router-dom";

function MoviesCardList(props) {
    const location = useLocation();
    const containerSelector = location.pathname === "/saved-movies" ? "cards_saved" : "";

    return (
        <section className={`cards ${containerSelector}`}>
            <ul className="cards__list">
                {location.pathname === "/movies" ? (
                    props.initialMovies.map((movie, i) => (
                        <MoviesCard 
                            movie={movie} 
                            key={movie.id}
                        />
                    ))
                ) : (
                    savedCards.map((movie, i) => (
                        <MoviesCard movie={movie} key={movie.id} />
                    ))
                )}
            </ul>
        </section>
    );
}

export default MoviesCardList;
