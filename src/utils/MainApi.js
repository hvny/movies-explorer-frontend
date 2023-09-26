class MainApi {
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

    /*получение данных пользователя*/
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => this._checkForError(res));
    }

    /*обновление данных пользователя*/
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                credentials: "include",
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    email: data.email,
                    name: data.name
                })
            })
            .then(res => this._checkForError(res));
    }

    saveMovie(data) {
        return fetch(`${this._baseUrl}/movies`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({
            country: data.country,
            director: data.director,
            duration: data.duration, 
            year: data.year,
            description: data.description,
            image: data.image,
            trailerLink: data.trailerLink,
            nameRU: data.nameRU,
            nameEN: data.nameEN,
            thumbnail: data.thumbnail,
            movieId: data.movieId,
          }),
        })
        .then(res => this._checkForError(res))
    };

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/${movieId}`, {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem('jwt')}`
          },
        })
        .then((res) => this._checkStatus(res))
    };

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`,{
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => this._checkForError(res))
    };
}

export const mainApi = new MainApi({
    baseUrl: "https://api.hvny-diplom.students.nomoredomainsicu.ru",
    headers: {
        "Content-type": "application/json"
    }
});