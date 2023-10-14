import "./Register.css";
import "../Auth/Auth.css";
import logo from "../../../src/images/logo.svg";

import AuthForm from "../AuthForm/AuthForm";
import useForm from "../Validation/Validation";

import { Link } from "react-router-dom";
import { useEffect } from "react";

function Register(props) {
    const { values, handleChange, errors, isValid, resetForm } = useForm();

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.registration(values.email, values.password, values.name);
    }

    return (
        <main>
            <section className="register auth">
            <Link to="/" className="auth__logo button"><img src={logo} alt="Логотип проекта"></img></Link>
            <h1 className="register__title auth__title">Добро пожаловать!</h1>
                <AuthForm
                    name="signup-form"
                    linkText1="Зарегистрироваться"
                    linkText2="Уже зарегистрированы?"
                    linkSpan2="Войти"
                    isValid={isValid}
                    onSubmit={handleSubmit}
                    isLoading={props.isLoading}
                    formError={props.formError}
                >
                    <div className="register__input-container auth-form__input-container">
                        <label className="register__text auth-form__text">Имя</label>
                        <input 
                            type="text"
                            name="name"
                            autoComplete="off"
                            className="register__input auth-form__input" 
                            minLength="2" 
                            maxLength="30" 
                            placeholder="Имя"
                            pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
                            required
                            value={values.name || ""}
                            onChange={handleChange}
                            disabled={props.isLoading}
                        />
                        <span className={`auth-form__error ${!isValid && errors.name ? "auth-form__error_active" : ""}`}>{errors.name || ""}</span>
                    </div>
                    <div className="register__input-container auth-form__input-container">
                        <label className="register__text auth-form__text">E-mail</label>
                        <input 
                            type="email" 
                            name="email"
                            autoComplete="off"
                            className="register__input auth-form__input" 
                            minLength="2" 
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
                    <div className="register__input-container auth-form__input-container">
                        <label className="register__text auth-form__text">Пароль</label>
                        <input 
                            type="password" 
                            name="password"
                            autoComplete="off"
                            className="register__input auth-form__input" 
                            minLength="2" 
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

export default Register;