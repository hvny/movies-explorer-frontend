import { useState } from "react";
import "./SearchForm.css"

function SearchForm() {
    const [checkbox, setCheckbox] = useState(false);

    function handleCheckbox() {
        setCheckbox(!checkbox);
    }

    return (
        <section className="search">
            <form name="search_form" className="search__form">
                <div className="search__input-container">
                    <input type="text" className="search__input" placeholder="Фильм" required />
                    <button type="submit" className="search__button button"></button>
                </div>
                <div className="search__checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={checkbox} 
                        onChange={handleCheckbox} 
                        className="search__checkbox search__checkbox_custom" 
                    />
                    <label className="search__text button" id="search-checkbox">Короткометражки</label>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;