import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import {
    windowSizeLarge,
    windowSizeSmall,
    nextMoviesDefault,
    nextMoviesSizeLarge,
    nextMoviesSizeMedium,
    nextMoviesSizeSmall,
} from "../../constants/constants";

import useWindowSize from "../../utils/useWindowSize";
import {
    setReq,
    getReq,
} from "../../utils/utils"
import changeMovie from "../../utils/changeMovie";
import { moviesApi } from "../../utils/MoviesApi";
import {
    handleSearchMovie,
    searchShortMovies,
} from "../../utils/search";

import { useEffect, useState } from "react";

function Movies(props) {
    const windowSize  = useWindowSize();
    const [movies, setMovies] = useState([]);
    const [initialMovies, setInitialMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [nextMovies, setNextMovies] = useState(nextMoviesDefault);
    const [searchReq, setSearchReq] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isCheckbox, setIsCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {                                  //определяем кол-во рядов в контейнере с карточками
        if (windowSize >= windowSizeLarge) {
            setNextMovies(nextMoviesSizeLarge)
        } 
        else if(windowSize <= windowSizeSmall) {
            setNextMovies(nextMoviesSizeSmall)
        }
        else {
            setNextMovies(nextMoviesSizeMedium);
        }
    }, [windowSize, searchReq]);

    useEffect(() => {
        checkReqs();
    }, []);

    useEffect(() => {
        setIsCheckbox(getReq('lastCheckbox'));
    }, []);

    async function checkMovies() {
        setIsLoading(true);
        await moviesApi.getInitialMovies()
        .then((data) => {
            const changedMovies = changeMovie(data);
            localStorage.setItem("movies", JSON.stringify(changedMovies));
            setInitialMovies(changedMovies);
        })
        .catch((err) => {
            console.error();
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    async function searchMovies(req) {
        setIsLoading(true);
        setSearchReq(req);
        //setMovies([]);
        setSearchError("");
        setShortMovies([]);
        try {
            if(req.length > 0) {
                await checkMovies()
                const renderedMovies = await handleSearchMovie(initialMovies, req);

                if(renderedMovies.length === 0 && req.length > 0) {
                    setSearchError("Ничего не найдено.");
                } 

                else if (renderedMovies.length > 0 && req.length > 0){
                    setMovies(renderedMovies);
                    const shorts = await searchShortMovies(renderedMovies);

                    setShortMovies(shorts)

                    setReq("lastShorts", shorts);
                    setReq("lastReq", req);
                    setReq("lastMovies", renderedMovies);
                    setReq("lastCheckbox", isCheckbox); 
                }
            }
            else {
                setSearchError("Нужно ввести ключевое слово");
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
        const lastShorts = localStorage.getItem("lastShorts");

        if(lastReq){
          setSearchReq(getReq('lastReq'));
        }

        if(lastMovies){
          setMovies(getReq('lastMovies'));
        }

        if (lastShorts) {
            setShortMovies(getReq('lastShorts'));
        }

        return;
    };

    function handleCheckbox(value){   //нажатие на чекбокс
        setIsCheckbox(value);
        setReq("lastCheckbox", value);

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
                    checkReqs={checkReqs}
                    setSearchReq={setSearchReq}
                    handleCheckboxClick={handleCheckbox}
                    isCheckbox={isCheckbox}
                    handleSearch={searchMovies}
                />
                {(searchError) && <p className={`movies__error ${movies.length > 0 ? "" : "movies__error_active"}`}>{searchError}</p>}
                <MoviesCardList 
                    movies={isCheckbox ? shortMovies : movies}
                    moviesQuantity={nextMovies.current}
                    savedMovies={props.savedMovies}
                    onSave={props.onSave}
                    onDelete={props.onDelete}
                    isLoading={isLoading}
                    searchError = {searchError}
                    searchReq = {searchReq}
                />
                {
                    ((movies.length > nextMovies.current) && (!isCheckbox && shortMovies.length < nextMovies.current)) && (
                        <button type="button" className="movies__button button" onClick={handleButtonClick}>Ещё</button>
                    )
                }
            </main>
            <Footer />
        </>
    )
}

export default Movies;