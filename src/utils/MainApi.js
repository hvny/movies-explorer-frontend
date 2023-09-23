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

    register(email, password, name) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(res => this._checkForError(res));
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            credentials: "include",
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
          })
          .then(res => this._checkForError(res))
          .then((data) => {
                localStorage.setItem('userId', data._id);
                return data;
          })
    }

    /*получение данных пользователя*/
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: "include",
            method: "GET",
        })
        .then(res => this._checkForError(res));
    }

    /*обновление данных пользователя*/
    updateUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                credentials: "include",
                method: "PATCH",
                headers: this._headers,
                body: JSON.stringify({
                    email: data.email,
                    name: data.name
                })
            })
            .then(res => this._checkForError(res));
    }
}

export const mainApi = new MainApi({
    baseUrl: "https://api.hvny-diplom.students.nomoredomainsicu.ru",
    headers: {
        "Content-type": "application/json"
    }
});