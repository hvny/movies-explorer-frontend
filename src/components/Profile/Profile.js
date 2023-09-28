import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

import { useState,useEffect, useContext } from "react";
import useForm from "../Validation/Validation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const { values, handleChange,  isValid, resetForm } = useForm();
    const { name, email } = values;
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        resetForm({
          name: currentUser.name,
          email: currentUser.email,
        })
      }, 
    [currentUser]);

    useEffect(() => {
        let isChanged = (currentUser.name !== values.name) || (currentUser.email !== values.email);
        setIsDisabled(isChanged);
      }, 
    [values, currentUser, isValid]);

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onUpdate({ name, email });
    }

    return (
        <>
            <Header />
            <main>
                <section className="profile">
                    <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <div className="profile__input-container">
                            <label className="profile__text">Имя</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={values.name || ""}
                                minLength="2"
                                maxLength="30"
                                placeholder={currentUser.name} 
                                required 
                                className="profile__input" 
                                onChange={handleChange}
                                disabled={props.isLoading}
                            />
                        </div>
                        <div className="profile__input-container">
                            <label className="profile__text">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={values.email || ""}
                                minLength="2"
                                maxLength="30"
                                placeholder={currentUser.email} 
                                pattern="[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-z]{2,4}$"
                                required 
                                className="profile__input" 
                                onChange={handleChange}
                                disabled={props.isLoading}
                            />
                        </div>
                        <div className="profile__links-container">
                            <span className='profile__text profile__error-message'>{props.profileError}</span>
                            <button type="submit" 
                                className={`profile__button profile__button_edit button ${!isValid ? "profile__button_disabled" : ""}`}
                                 disabled={!isValid || !isDisabled || props.isLoading}>
                            Редактировать
                            </button>
                            <Link to="/" className="profile__button profile__button_exit button" onClick={props.signout}>Выйти из аккаунта</Link>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;