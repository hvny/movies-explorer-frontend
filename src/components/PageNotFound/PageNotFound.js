import "./PageNotFound.css";

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


function PageNotFound() {
    const navigate = useNavigate();
    return (
        <main>
            <section className="page-not-found">
                <h1 className="page-not-found__title page-not-found__text ">404</h1>
                <h2 className="page-not-found__subtitle page-not-found__text ">Страница не найдена</h2>
                <Link onClick={()=>navigate(-1)} className="page-not-found__link button">Назад</Link>
            </section>
        </main>
    );
}

export default PageNotFound;