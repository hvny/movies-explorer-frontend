import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="project" id = "project">
            <h2 className="project__title">О проекте</h2>
            <div className="project__container">
                <div className="project__info">
                    <h3 className="project__info-title">Дипломный проект включал 5 этапов</h3>
                    <p className="project__info-text">
                        Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="project__info">
                    <h3 className="project__info-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="project__info-text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
                <div className="project__bottom">
                    <div className="project__deadlines project__bottom-container">
                        <div className="project__deadline"><p className="project__deadline_one-week project__deadline-text">1 неделя</p></div>
                        <div className="project__deadline"><p className="project__deadline_four-weeks project__deadline-text">4 недели</p></div>
                    </div>
                    
                    <div className="project__deadline-descriptions project__bottom-container">
                        <div className="project__deadline-description "><p className="project__deadline-text">Back-end</p></div>
                        <div className="project__deadline-description"><p className="project__deadline-text">Front-end</p></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;