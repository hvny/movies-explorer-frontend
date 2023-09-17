import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { cards, savedCards } from "../../../utils/cards";

import { useLocation } from "react-router-dom";

function MoviesCardList() {
    const location = useLocation();
    const containerSelector = location.pathname === "/saved-movies" ? "card-list_saved" : "";

    return (
        <section className={`card-list ${containerSelector}`}>
            {location.pathname === "/movies" ? (
                cards.map((movie, i) => (
                    <MoviesCard movie={movie} key={i} />
                ))
            ) : (
                savedCards.map((movie, i) => (
                    <MoviesCard movie={movie} key={i} />
                ))
            )}
        </section>
    );
}

export default MoviesCardList;
