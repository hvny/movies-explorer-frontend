import "./SavedMovies.css";
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";

import {
    shortMovieDuration,
} from "../../../constants/constants";

import { useEffect, useState } from "react";
function SavedMovies(props) {
    const [movies, setMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [searchReq, setSearchReq] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isCheckbox, setIsCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        searchMovies();
    }, [searchReq, isCheckbox]);

    useEffect(() => {
        if(isCheckbox){
            setMovies(shortMovies);
        }
    }, [isCheckbox]);

    function handleSearchMovie(movies, keyword){        //поиск фильма
        return movies.filter((movie) => {
          const word = keyword.toLowerCase().trim();
          return movie.nameRU.toLowerCase().indexOf(word) !== -1 || movie.nameEN.toLowerCase().indexOf(word) !== -1;
        });
    }

    function searchShortMovies(movies) {                
        return movies.filter((movie) => {
            return movie.duration <= shortMovieDuration;
        });
    }

    async function searchMovies() {
        setIsLoading(true);
        setMovies([]);
        try {
            if(searchReq.length >= 0) {
                const renderedMovies = await handleSearchMovie(props.savedMovies, searchReq);
                if(renderedMovies.length === 0 && searchReq.length > 0) {
                    setSearchError("Ничего не найдено.");
                } 
                else if (renderedMovies.length > 0){
                    if (isCheckbox) {                                         //если отмечен чекбокс, то отбираем короткометражки
                        setShortMovies(searchShortMovies(renderedMovies));
                    }
                    else {
                        setMovies(renderedMovies);
                    }
                }
            }
            return;
        } 
        catch(err) {
            console.error(err);
            setSearchError("Произошла ошибка. Пожалуйста, попробуйте ещё раз.");
        } 
        finally {
            setIsLoading(false);
        };
   }

    function handleCheckbox(value){   //нажатие на чекбокс
        setIsCheckbox(value);
    }

    return (
        <>
            <Header />
            <main className="saved-movies">
                <SearchForm 
                    searchReq={searchReq}
                    setSearchReq={setSearchReq}
                    handleCheckboxClick={handleCheckbox}
                    isCheckbox={isCheckbox}
                />
                {searchError && <p className={`movies__error ${movies.length > 0 ? "" : "movies__error_active"}`}>{searchError}</p>}
                <MoviesCardList 
                    savedMovies={!searchReq ? isCheckbox ? shortMovies : props.savedMovies : isCheckbox ? shortMovies : movies}
                    onSave={props.onSave}
                    onDelete={props.onDelete}
                    isLoading={isLoading}
                />
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;