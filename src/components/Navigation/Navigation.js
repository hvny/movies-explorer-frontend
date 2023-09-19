import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Navigation.css"
import logo from "../../images/logo.svg"
import SignoutNavigation from "./SignoutNavigation/SignoutNavigation";
import SigninNavigation from "./SigninNavigation/SigninNavigation";

function Navigation() {
    const location = useLocation();
    return (
        <nav className="navigation">
            <Link to="/">
                <img src={logo} alt="Логотип проекта" className="navigation__logo button"/>
            </Link>
            <div className="navigation__container">
                {location.pathname === "/" ? <SignoutNavigation /> : <SigninNavigation />}
            </div>
        </nav>
    );
};

export default Navigation;