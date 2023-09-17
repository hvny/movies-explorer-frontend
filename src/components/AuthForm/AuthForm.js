import "./AuthForm.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function AuthForm(props) {
    const location = useLocation();
    const linkPath = location.pathname === "/signup" ? "/signin" : "/signup";
    return (
    <form  name={props.name} className="auth-form">
            <div className="register__link-container">
            {props.children}

            <button type="submit" className="register__button auth-form__button register__button_signup button">{props.linkText1}</button>
            <Link to={linkPath} className="register__button auth-form__link register__button_signin button">
                {props.linkText2}
                <span className="register__link-span auth-form__link-span">{props.linkSpan2}</span>
            </Link>
        </div>
    </form>
    );
}


export default AuthForm;