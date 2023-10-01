import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import useWindowSize from "../../utils/useWindowSize";
import {
    shortMovieDuration,
    windowSizeLarge,
    windowSizeMedium,
    windowSizeSmall,
} from "../../constants/constants";
import {
    setReq,
    getReq,
} from "../../utils/utils"

import { useEffect, useState } from "react";


function Movies(props) {
    const windowSize  = useWindowSize();
    const [movies, setMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [nextMovies, setNextMovies] = useState({current: 0, next: 0});
    const [searchReq, setSearchReq] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isCheckbox, setIsCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {                                  //определяем кол-во рядов в контейнере с карточками
        if (windowSize >= windowSizeLarge) {
            setNextMovies({current: 12, next: 3})
        } 
        else if(windowSize <= windowSizeSmall) {
            setNextMovies({current: 5, next: 2})
        }
        else {
            setNextMovies({current: 8, next: 2});
        }
    }, [windowSize]);  

    useEffect(() => {
        searchMovies();
    }, [searchReq, isCheckbox]);

    useEffect(() => {
        checkReqs();
    }, []);

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
                const renderedMovies = await handleSearchMovie(props.initialMovies, searchReq);
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
                    setReq("lastReq", searchReq);
                    setReq("lastMovies", renderedMovies);
                    setReq("lastCheckbox", isCheckbox);
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

    function checkReqs(){
        const lastReq = localStorage.getItem("lastReq");
        const lastMovies = localStorage.getItem("lastMovies");
        const lastCheckbox = localStorage.getItem("lastCheckbox");

        if(lastReq){
          setSearchReq(getReq('lastReq'));
        }

        if(lastMovies){
          setMovies(getReq('lastMovies'));
        }

        if(lastCheckbox){
          setIsCheckbox(getReq('lastCheckbox'));
        }

        return;
    };

    function handleCheckbox(value){   //нажатие на чекбокс
        setIsCheckbox(value);
    }

    function handleButtonClick() {                  //кнопка "ещё"
        if (!isCheckbox) {
            setNextMovies({current: nextMovies.current + nextMovies.next, next: nextMovies.next });
        }
    }

    return (
        <>  
            <Header />
            <main className="movies">
                <SearchForm 
                    searchReq={searchReq}
                    setSearchReq={setSearchReq}
                    handleCheckboxClick={handleCheckbox}
                    isCheckbox={isCheckbox}
                />
                {searchError && <p className={`movies__error ${movies.length > 0 ? "" : "movies__error_active"}`}>{searchError}</p>}
                <MoviesCardList 
                    movies={isCheckbox ? shortMovies : movies}
                    moviesQuantity={nextMovies.current}
                    savedMovies={props.savedMovies}
                    onSave={props.onSave}
                    onDelete={props.onDelete}
                    isLoading={isLoading}
                />
                {
                    (movies.length > nextMovies.current) && (
                        <button type="button" className="movies__button button" onClick={handleButtonClick}>Ещё</button>
                    )
                }
            </main>
            <Footer />
        </>
    )
}

export default Movies;