import "./Login.css";
import "../Auth/Auth.css";
import logo from "../../../src/images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Login() {
    return (
        <main>
            <section className="login auth">
            <img src={logo} alt="Логотип проекта" className="auth__logo" ></img>
            <h1 className="login__title auth-form__title">Рады видеть!</h1>
                <AuthForm
                    name="signin-form"
                    linkText1="Войти"
                    linkText2="Ещё не зарегистрированы?"
                    linkSpan2="Регистрация"
                > 
                    <div className="login__input-container auth-form__input-container">
                        <p className="login__text auth-form__text">E-mail</p>
                        <input 
                            type="email" 
                            autoComplete="off"
                            className="login__input auth-form__input" 
                        />
                        <span className="auth-form__error">Что-то пошло не так...</span>
                    </div>
                    <div className="login__input-container auth-form__input-container">
                        <p className="login__text auth-form__text">Пароль</p>
                        <input 
                            type="password"
                            autoComplete="off"
                            className="login__input auth-form__input" 
                        />
                        <span className="auth-form__error">Что-то пошло не так...</span>
                    </div>
                </AuthForm>
            </section>
        </main>
    );
}

export default Login;