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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  function registration(email, password, name) {
    setIsLoading(true);
    mainApi.register(email, password, name)
      .then(() => {
        authorization(email, password);
      })
      .catch((err) => {
        console.log(err);
        setFormError(err);
      })
      .finally(() => setIsLoading(false));
  }

  function authorization(email, password) {
    setIsLoading(true);
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          navigate("/movies", {replace: true});
        }
      }) 
      .catch((err) => {
        console.log(err);
        setFormError(err);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<ProtectedRoute 
            element={Movies}
            loggedIn={loggedIn}
            />} 
          />
          <Route path="/saved-movies" element={<ProtectedRoute 
            element={SavedMovies}
            loggedIn={loggedIn}
            />} 
          />
          <Route path="/profile" element={<ProtectedRoute 
            element={Profile}
            loggedIn={loggedIn} 
            />} 
          />
          <Route path="/signup" element={<Register 
            isLoading={isLoading}
            registration={registration}
            formError={formError}
            />} 
          />
          <Route path="/signin" element={<Login 
            isLoading={isLoading}
            authorization={authorization}
            formError={formError}
            />} 
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
