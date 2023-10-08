import "./SearchForm.css"
import useForm from "../../Validation/Validation";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
    setReq,
} from "../../../utils/utils"

function SearchForm(props) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();
    const location = useLocation();
    useEffect(() => {   
        resetForm({ movieTitle: props.searchReq })
    }, [resetForm, props.searchReq])

    
    
    function handleSearchClick(evt) {
        evt.preventDefault();
        if (location.pathname==="/movies") {
            props.checkReqs();
            props.handleSearch(values.movieTitle, props.isCheckbox);
        }
        else {
            props.setSearchReq(values.movieTitle);
            setReq("lastReqSaved", values.movieTitle);
            // if (values.movieTitle.length === 0) {
            //     props.setSearchError("Нужно ввести ключевое слово");
            // }
        }   
    }

    return (
        <section className="search">
            <form name="search_form" className="search__form" onSubmit={handleSearchClick} noValidate>
                <div className="search__input-container">
                    <input 
                        type="text" 
                        name="movieTitle" 
                        value={values.movieTitle || ''}
                        className="search__input" 
                        placeholder="Фильм" 
                        required 
                        onChange={handleChange}
                    />
                    <button type="submit" className="search__button button"></button>
                </div>
                <div className="search__checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={props.isCheckbox} 
                        className="search__checkbox search__checkbox_custom" 
                        onChange={(evt) => props.handleCheckboxClick(evt.target.checked)}
                        id="search-checkbox"
                    />
                    <label className="search__text button" htmlFor="search-checkbox">Короткометражки</label>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;