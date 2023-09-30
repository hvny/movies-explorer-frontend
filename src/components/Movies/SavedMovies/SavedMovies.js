import "./SavedMovies.css";
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";
function SavedMovies(props) {
    return (
        <>
            <Header />
            <main className="saved-movies">
            <SearchForm />
            <MoviesCardList initialMovies={props.initialMovies} />
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;