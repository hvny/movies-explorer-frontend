const BASE_URL = "https://api.hvny-diplom.students.nomoredomainsicu.ru";

const checkForError = (res) => {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (email, password, name) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: "include",
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
    .then(res => checkForError(res));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
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
    .then(res => checkForError(res));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: "include",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    })
    .then(res => checkForError(res));
};
