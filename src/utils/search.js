import { shortMovieDuration } from "../constants/constants";

export function handleSearchMovie(movies, keyword){        //поиск фильма
    return movies.filter((movie) => {
      const word = keyword.toLowerCase().trim();
      return movie.nameRU.toLowerCase().indexOf(word) !== -1 || movie.nameEN.toLowerCase().indexOf(word) !== -1;
    });
}

export function searchShortMovies(movies) {                
    return movies.filter((movie) => {
        return movie.duration <= shortMovieDuration;
    });
}
