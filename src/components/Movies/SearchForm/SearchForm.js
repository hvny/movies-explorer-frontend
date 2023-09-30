import "./SearchForm.css"
import useForm from "../../Validation/Validation";

import { useEffect } from "react";


function SearchForm(props) {
    const { values, handleChange, resetForm } = useForm();

    useEffect(() => {   
        resetForm({ movieTitle: props.searchReq })
    }, [props.searchReq])
    
    function handleSearchClick(evt) {
        evt.preventDefault();
        props.setSearchReq(values.movieTitle);
    }

    function handleCheckbox(evt) {
        props.handleCheckboxClick(evt.target.checked);
    }

    return (
        <section className="search">
            <form name="search_form" className="search__form" onSubmit={handleSearchClick}>
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
                        onChange={handleCheckbox}
                    />
                    <label className="search__text button" id="search-checkbox">Короткометражки</label>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;