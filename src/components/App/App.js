import "./App.css";
import "../Button/Button.css"
import Main from "../Main/Main"
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute";

import { mainApi } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});


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
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
