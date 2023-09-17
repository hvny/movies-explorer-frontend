import "./Footer.css";

function Footer(){
    return (
        <footer className="footer">
            <h2 className="footer__title  footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <p className="footer__year footer__text">&copy; 2023</p>
                <ul className="footer__links">
                    <li className="footer__links-item">
                        <a href="https://practicum.yandex.ru" target="_blank" rel="noreferrer" className="footer__link footer__text button">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__links-item">
                        <a href="https://github.com/hvny" target="_blank" rel="noreferrer" className="footer__link footer__text button">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;