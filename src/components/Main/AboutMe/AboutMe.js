import avatar from "../../../images/avatar.png"
import "./AboutMe.css";

function AboutMe() {
    return (
        <section className="me" id="me">
            <div className="me__content">
                <h2 className="me__title">Студент</h2>
                <div className="me__container">
                    <div className="me__text">
                        <p className="me__name">Виталий</p>
                        <p className="me__status">Фронтенд-разработчик, 30 лет</p>
                        <p className="me__info">
                            Я родился и живу в Саратове, закончил факультет экономики СГУ. 
                            У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
                            Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
                            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
                        </p>
                        <a href="https://github.com/hvny" target="_blank" rel="noreferrer" className="me__link button">Github</a>
                    </div>
                    <img className="me__photo" src={avatar} alt="Моё фото" />
                </div>
            </div>
        </section>
    );
}

export default AboutMe;