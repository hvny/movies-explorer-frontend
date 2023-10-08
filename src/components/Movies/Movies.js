import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

import useWindowSize from "../../utils/useWindowSize";
import {
    shortMovieDuration,
    windowSizeLarge,
    windowSizeSmall,
} from "../../constants/constants";
import {
    setReq,
    getReq,
} from "../../utils/utils"

import {
    handleSearchMovie,
    searchShortMovies,
} from "../../utils/search";

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
    }, [windowSize, searchReq]);

    useEffect(() => {
        checkReqs();
    }, []);

    useEffect(() => {
        setIsCheckbox(getReq('lastCheckbox'));
    }, []);

    async function searchMovies(req) {
        setIsLoading(true);
        setSearchReq(req);
        setMovies([]);
        setShortMovies([]);

        try {
            if(req.length > 0) {
                const renderedMovies = await handleSearchMovie(props.initialMovies, req);

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