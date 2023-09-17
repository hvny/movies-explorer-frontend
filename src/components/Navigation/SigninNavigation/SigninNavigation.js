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
            <div className={`navigation_signin ${isBurgerOnClick === true ? "navigation_opened" : ""}`}>
                <button className="navigation__button_close button" onClick={handleButtonClick} />
                <div className="navigation__movies-links">
                    <Link 
                        to="/" 
                        className={`navigation__link navigation__link-signin navigation__link_main button 
                       `}
                    >
                        Главная
                        <div className={`${location.pathname === "/" ? "navigation-link__underline" : ""}`} />
                    </Link>
                    <Link 
                        to="/movies" 
                        className={`navigation__link navigation__link-signin navigation__link_movies button 
                        `}
                    >
                        Фильмы
                        <div className={`${location.pathname === "/movies" ? "navigation-link__underline" : ""}`} />
                    </Link>
                    <Link 
                        to="/saved-movies" 
                        className={`navigation__link navigation__link-signin navigation__link_saved-movies button
                        `}
                    >
                        Сохранённые фильмы
                        <div className={`${location.pathname === "/saved-movies" ? "navigation-link__underline" : ""}`} />

                    </Link>
                </div>
                <Link to="/profile" className="navigation__link navigation__link_profile button">Аккаунт</Link>
            </div>
            <div className={`navigation__overlay ${isBurgerOnClick ? "navigation__overlay_opened" : ""}`} />
            <button className="navigation__burger button" onClick={handleButtonClick} />
        </>
        
    )
}

export default SigninNavigation;