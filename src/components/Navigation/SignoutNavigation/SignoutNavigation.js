import "./SignoutNavigation.css";
import { Link } from "react-router-dom";

function SignoutNavigation() {
    return (
        <nav className="navigation__signout">
            <Link to="/signup" className="navigation__link navigation__link_signup navigation__link-signout button">Регистрация</Link>
            <Link to="/signin" className="navigation__link navigation__link_signin navigation__link-signout button">Войти</Link>
        </nav>
    );
}   

export default SignoutNavigation;