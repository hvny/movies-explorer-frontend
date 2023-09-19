import "./Profile.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import { useState } from "react";

function Profile() {
    const [formValue, setFormValue] = useState({
        name:"Виталий",
        email:"pochta@yandex.ru"
    });

    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
    }

    return (
        <>
            <Header />
            <main>
                <section className="profile">
                    <h1 className="profile__title">{`Привет, ${formValue.name}!`}</h1>
                    <form className="profile__form" onSubmit={handleSubmit}>
                        <div className="profile__input-container">
                            <label className="profile__text">Имя</label>
                            <input 
                                type="text" 
                                name="name" 
                                minLength="2"
                                maxLength="30"
                                placeholder={formValue.name} 
                                required 
                                className="profile__input" 
                            />
                        </div>
                        <div className="profile__input-container">
                            <label className="profile__text">E-mail</label>
                            <input 
                                type="email" 
                                name="email" 
                                minLength="2"
                                maxLength="30"
                                placeholder={formValue.email} 
                                required 
                                className="profile__input" 
                            />
                        </div>
                        <div className="profile__links-container">
                            <button type="submit" className="profile__button profile__button_edit button">Редактировать</button>
                            <Link to="/" className="profile__button profile__button_exit button">Выйти из аккаунта</Link>
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Profile;