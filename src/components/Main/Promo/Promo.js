import "./Promo.css";
import { HashLink } from "react-router-hash-link";

function Promo() {
    return (
        <section className="promo"> 
            <div className="promo__container">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                <ul className="promo__links-container">
                    <li><HashLink to="/#project" className="promo__link button">О проекте</HashLink></li>
                    <li><HashLink to="/#techs" className="promo__link button">Технологии</HashLink></li>
                    <li><HashLink to="/#me" className="promo__link button">Студент</HashLink></li>
                </ul>
            </div>
        </section>
    )
}

export default Promo;