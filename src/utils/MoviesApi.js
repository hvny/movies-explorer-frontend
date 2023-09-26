class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    /*проверка на ошибку*/
    _checkForError(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    /*получаем все фильмы*/
    getMovies(){
        return fetch(this._url, {
            headers: this._headers,
        })
        .then(res => this._checkForError(res));
    };
}

export const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
    headers: {
        "Content-type": "application/json"
    }
});