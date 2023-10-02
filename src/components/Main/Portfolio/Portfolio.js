import "./Portfolio.css"

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
                <ul className="portfolio__links">
                    <li className="portfolio__links-item">
                        <a href="https://hvny.github.io/how-to-learn/" target="_blank" rel="noreferrer" className="portfolio__link button">
                            <p className="portfolio__link-name">Статичный сайт</p>
                            <span className="portfolio__link-icon">↗</span>
                        </a>
                    </li>
                    <li className="portfolio__links-item">
                        <a href="https://hvny.github.io/russian-travel/" target="_blank" rel="noreferrer" className="portfolio__link button">
                            <p className="portfolio__link-name">Адаптивный сайт</p>
                            <span className="portfolio__link-icon">↗</span>
                        </a>
                    </li>
                    <li className="portfolio__links-item">
                        <a href="https://hvny.github.io/mesto/" target="_blank" rel="noreferrer" className="portfolio__link button">
                            <p className="portfolio__link-name">Одностраничное приложение</p>
                            <span className="portfolio__link-icon">↗</span>
                        </a>
                    </li>
                </ul>
        </section>
    );
}

export default Portfolio;