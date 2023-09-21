import "./Login.css";
import "../Auth/Auth.css";
import logo from "../../../src/images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";
import { Link } from "react-router-dom";

function Login() {
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
                > 
                    <div className="login__input-container auth-form__input-container">
                        <label className="login__text auth-form__text">E-mail</label>
                        <input 
                            type="email" 
                            minLength="2"
                            maxLength="30"
                            autoComplete="off"
                            placeholder="E-mail"
                            className="login__input auth-form__input" 
                        />
                        <span className="auth-form__error">Что-то пошло не так...</span>
                    </div>
                    <div className="login__input-container auth-form__input-container">
                        <label className="login__text auth-form__text">Пароль</label>
                        <input 
                            type="password"
                            minLength="2" 
                            maxLength="30" 
                            autoComplete="off"
                            placeholder="Пароль"
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