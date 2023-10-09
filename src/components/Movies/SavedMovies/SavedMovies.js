import "./SavedMovies.css";
import Header from "../../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../../Footer/Footer";

import {
    shortMovieDuration,
} from "../../../constants/constants";

import {
    setReq,
    getReq,
} from "../../../utils/utils"

import {
    handleSearchMovie,
    searchShortMovies,
} from  "../../../utils/search";

import { useEffect, useState } from "react";
function SavedMovies(props) {
    const [movies, setMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [searchReq, setSearchReq] = useState("");
    const [searchError, setSearchError] = useState("");
    const [isCheckbox, setIsCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {                                   //отрисовываем сохранённые карточки
        searchMovies();
    }, [searchReq, isCheckbox, props.savedMovies]);

    useEffect(() => {                                   //берём данные запросе и о чнкбокесе из localStorage
        setIsCheckbox(getReq('lastCheckboxSaved'));
        setSearchReq(getReq('lastReqSaved'));
    }, []);

   async function searchMovies() {
    console.log("ok");
    setIsLoading(true);
    setMovies([]);
    setSearchError("");
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
            else {
                setSearchError("");
            }
            console.log(searchError);
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
        setReq("lastCheckboxSaved", value);
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
                    setSearchError={setSearchError}
                />
                {searchError ? <p className={`movies__error ${movies.length > 0 ? "" : "movies__error_active"}`}>{searchError}</p> :
                <MoviesCardList 
                    savedMovies={!searchReq ? isCheckbox ? shortMovies : props.savedMovies : isCheckbox ? shortMovies : movies}
                    onSave={props.onSave}
                    onDelete={props.onDelete}
                    isLoading={isLoading}
                    searchReq = {searchReq}
                />
                }
                
            </main>
            <Footer />
        </>
    );
}

export default SavedMovies;