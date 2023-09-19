import "./SigninNavigation.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function SigninNavigation() {
    const [isBurgerOnClick, setIsBurgerOnClick] = useState(false)

    const location = useLocation();

    function handleButtonClick() {
        setIsBurgerOnClick(!isBurgerOnClick);
    }

    return (    
        <>
            <div className={`navigation__signin ${isBurgerOnClick === true ? "navigation__signin_opened" : ""}`}>
                <button className="navigation__button navigation__button_close button" onClick={handleButtonClick} />
                <ul className="navigation__movies-links">
                    <li className="navigation__link-elem">
                        <Link 
                            to="/" 
                            className={`navigation__link navigation__link-signin navigation__link_main button 
                        `}
                        >
                            Главная
                            <div className={`${location.pathname === "/" ? "navigation__link-underline" : ""}`} />
                        </Link>
                    </li>
                    <li className="navigation__link-elem navigation__link-elem_movies">
                        <Link 
                            to="/movies" 
                            className={`navigation__link navigation__link-signin navigation__link_movies button 
                            `}
                        >
                            Фильмы
                            <div className={`${location.pathname === "/movies" ? "navigation__link-underline" : ""}`} />
                        </Link>
                    </li>
                    <li className="navigation__link-elem">
                        <Link 
                            to="/saved-movies" 
                            className={`navigation__link navigation__link-signin navigation__link_saved-movies button
                            `}
                        >
                            Сохранённые фильмы
                            <div className={`${location.pathname === "/saved-movies" ? "navigation__link-underline" : ""}`} />
                        </Link>
                    </li>
                </ul>
                <Link to="/profile" className="navigation__link navigation__link_profile button">Аккаунт</Link>
            </div>
            <div className={`navigation__overlay ${isBurgerOnClick ? "navigation__overlay_opened" : ""}`} />
            <button type="button" className="navigation__burger button" onClick={handleButtonClick} />
        </>
        
    )
}

export default SigninNavigation;