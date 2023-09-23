import "./App.css";
import "../Button/Button.css"
import Main from "../Main/Main"
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { mainApi } from "../../utils/MainApi";

import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";

function App() {
  useEffect(() => {
    mainApi.getUserInfo()
      .then(res=>console.log("okok"))
      .catch(err=> console.error);
  }, [])

  return (
      <div className="page">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
  );
}

export default App;
