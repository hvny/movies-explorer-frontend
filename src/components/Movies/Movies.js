import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function Movies() {
    return (
        <>  
            <Header />
            <main className="movies">
                <SearchForm />
                <MoviesCardList />
                <button type="button" className="movies__button button">Ещё</button>
            </main>
        <Footer />
        </>
    )
}

export default Movies;