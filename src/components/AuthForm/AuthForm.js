import "./AuthForm.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import useForm from "../Validation/Validation"; 

function AuthForm(props) {
    const location = useLocation();
    const linkPath = location.pathname === "/signup" ? "/signin" : "/signup";
    const { errors } = useForm();

    return (
    <form  name={props.name} className="auth-form" onSubmit={props.onSubmit} noValidate>
        <div className="auth-form__link-container">
            {props.children}
            <span className="auth-from__error-message">{props.formError}</span>
            <button type="submit" 
                className={`auth-form__button auth-form__button_signup button ${(!props.isValid && errors) || props.isLoading ? "auth-form__button_disabled" : ""}`}
                disabled={!props.isValid || props.isLoading}
            >
                {props.linkText1}
            </button>
            <Link to={linkPath} className="auth-form__link auth-form__link_signin button">
                {props.linkText2}
                <span className="auth-form__link-span">{props.linkSpan2}</span>
            </Link>
        </div>
    </form>
    );
}

export default AuthForm;