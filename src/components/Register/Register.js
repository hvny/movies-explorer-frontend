import "./Register.css";
import "../Auth/Auth.css";
import logo from "../../../src/images/logo.svg";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
    return (
        <main>
            <section className="register auth">
            <img src={logo} alt="Логотип проекта" className="auth__logo" ></img>
            <h1 className="register__title auth-form__title">Добро пожаловать!</h1>

                <AuthForm
                    name="signup-form"
                    linkText1="Зарегистрироваться"
                    linkText2="Уже зарегистрированы?"
                    linkSpan2="Войти"
                >
                     <div className="register__input-container auth-form__input-container">
                        <p className="register__text auth-form__text">Имя</p>
                        <input 
                            type="text"
                            name="name"
                            autoComplete="off"
                            className="register__input auth-form__input" 
                            minLength="2" 
                            maxLength="30" 
                        
                        />
                        <span className="auth-form__error">Что-то пошло не так...</span>
                    </div>
                    <div className="register__input-container auth-form__input-container">
                        <p className="register__text auth-form__text">E-mail</p>
                        <input 
                            type="email" 
                            name="email"
                            autoComplete="off"
                            className="register__input auth-form__input" 
                            minLength="2" 
                            maxLength="30"
                        />
                        <span className="auth-form__error">Что-то пошло не так...</span>
                    </div>
                    <div className="register__input-container auth-form__input-container">
                        <p className="register__text auth-form__text">Пароль</p>
                        <input 
                            type="password" 
                            name="password"
                            autoComplete="off"
                            className="register__input auth-form__input" 
                            minLength="2" 
                            maxLength="30"
                        />
                        <span className="auth-form__error">Что-то пошло не так...</span>
                    </div>
                </AuthForm>
            </section>

        </main>
    );
}

export default Register;