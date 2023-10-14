import { Link } from "react-router-dom";

import "./Navigation.css"
import logo from "../../images/logo.svg"
import SignoutNavigation from "./SignoutNavigation/SignoutNavigation";
import SigninNavigation from "./SigninNavigation/SigninNavigation";

function Navigation() {
    
    return (
        <nav className="navigation">
            <Link to="/">
                <img src={logo} alt="Логотип проекта" className="navigation__logo button"/>
            </Link>
            <div className="navigation__container">
                {localStorage.getItem("loggedIn") !== "true" ? <SignoutNavigation /> : <SigninNavigation />}
            </div>
        </nav>
    );
};

export default Navigation;