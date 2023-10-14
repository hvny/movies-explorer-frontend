import "./Login.css";
import "../Auth/Auth.css";
import logo from "../../../src/images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import useForm from "../Validation/Validation";

import { Link } from "react-router-dom";
import { useEffect } from "react";

function Login(props) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.authorization(values.email, values.password);
    }

    return (
        <main>
            <section className="login auth">
            <Link to="/" className="auth__logo button"><img src={logo} alt="Логотип проекта"></img></Link>
            <h1 className="login__title auth__title">Рады видеть!</h1>
                <AuthForm
                    name="signin-form"
                    linkText1="Войти"
                    linkText2="Ещё не зарегистрированы?"
                    linkSpan2="Регистрация"
                    isValid={isValid}
                    onSubmit={handleSubmit}
                    isLoading={props.isLoading}
                    formError={props.formError}
                > 
                    <div className="login__input-container auth-form__input-container">
                        <label className="login__text auth-form__text">E-mail</label>
                        <input 
                            type="email" 
                            name="email"
                            autoComplete="off"
                            className="login__input auth-form__input" 
                            minLength="4"
                            maxLength="30"
                            placeholder="E-mail"
                            pattern="[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-z]{2,4}$"
                            required
                            value={values.email || ""}
                            onChange={handleChange}
                            disabled={props.isLoading}
                        />
                        <span className={`auth-form__error ${!isValid && errors.email ? "auth-form__error_active" : ""}`}>{errors.email || ""}</span>
                    </div>
                    <div className="login__input-container auth-form__input-container">
                        <label className="login__text auth-form__text">Пароль</label>
                        <input 
                            type="password"
                            name="password"
                            autoComplete="off"
                            className="login__input auth-form__input" 
                            minLength="4" 
                            maxLength="16" 
                            placeholder="Пароль"
                            required
                            value={values.password || ""}
                            onChange={handleChange}
                            disabled={props.isLoading}
                        />
                        <span className={`auth-form__error ${!isValid && errors.password ? "auth-form__error_active" : ""}`}>{errors.password || ""}</span>
                    </div>
                </AuthForm>
            </section>
        </main>
    );
}

export default Login;