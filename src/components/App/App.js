import "./App.css";
import "../Button/Button.css"
import Main from "../Main/Main"
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import * as auth from "../../utils/auth"; 
import changeMovie from "../../utils/changeMovie";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') ||  false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [initialMovies, setInitialMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if(token) {
      auth.getContent(token)
        .then((res) => {
          setLoggedIn(true);
          setCurrentUser({
            name: res.data.name,
            email: res.data.email,
          });
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    if(loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies([])])
      .then(([user, movies]) => {
        setCurrentUser({
          name: user.data.name,
          email: user.data.email
        });
        setSavedMovies(movies);
      })
      .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    checkMovies();
  }, []);
  
  function registration(email, password, name) {    //регистрация
    setIsLoading(true);
    auth.register(email, password, name)
      .then(() => {
        authorization(email, password);
      })
      .catch((err) => {
        setFormError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function authorization(email, password) {         //аутентификация
    setIsLoading(true);
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("loggedIn", true);
          navigate("/movies", {replace: true});
        }
      }) 
      .catch((err) => {
        setFormError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function signout() {
    localStorage.clear();
    setCurrentUser({});
    setLoggedIn(false);
    navigate("/", {replace: true});
  }

  function handleUpdateUser(newUserInfo) {          //обновление данных пользователя
    setIsLoading(true);
    mainApi.updateUserInfo(newUserInfo)
      .then((res) => {
        setCurrentUser(res);
        setProfileError("Данные успешно обновлены.")
      })
      .catch((err) => {
        console.log(err);
        setProfileError("Проверьте правильность введённых данных.")
      })
      .finally(() => setIsLoading(false));
  }

  function checkMovies() {                           //проверяем, есть ли в хранилище дефолтные фильмы
    const movies = localStorage.getItem("movies");   //если нет, то запрашиваем с сервера
    if (movies) {
      setInitialMovies(JSON.parse(movies));
    }
    else{
      setIsLoading(true);
      moviesApi.getInitialMovies()
        .then((data) => {
          const changedMovies = changeMovie(data);
          localStorage.setItem("movies", JSON.stringify(changedMovies));
          setInitialMovies(changedMovies);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }

  function handleSaveMovie(movie) {                     //сохранение фильма
    setIsLoading(true);
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleDeleteMovie(_id) {                            //удаление фильма
    setIsLoading(true);
    mainApi.deleteMovie(_id)
      .then(() => {
        const updatedMoviesArr = savedMovies.filter((c) => c._id !== _id);
        setSavedMovies(updatedMoviesArr);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" 
            element={<Main />} 
          />
          <Route path="/movies" element={<ProtectedRoute 
            element={Movies}
            loggedIn={loggedIn}
            initialMovies={initialMovies}
            savedMovies={savedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            />} 
          />
          <Route path="/saved-movies" element={<ProtectedRoute 
            element={SavedMovies}
            loggedIn={loggedIn}
            initialMovies={initialMovies}
            savedMovies={savedMovies}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            isSaved={true}
            />} 
          />
          <Route path="/profile" element={<ProtectedRoute 
            element={Profile}
            loggedIn={loggedIn} 
            isLoading={isLoading}
            signout={signout}
            onUpdate={handleUpdateUser}
            profileError={profileError}
            />} 
          />
          {
            !loggedIn ? (
              <Route path="/signup" element={<Register 
                isLoading={isLoading}
                registration={registration}
                formError={formError}
                />} 
              />
            ) : (
              <Route path="/signup" element={<Navigate to="/"/>} />
            )

          }
          {
            !loggedIn ? (
              <Route path="/signin" element={<Login 
                isLoading={isLoading}
                authorization={authorization}
                formError={formError}
                />} 
              />
            ) : (
              <Route path="/signin" element={<Navigate to="/"/>} />
            )
          }
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
