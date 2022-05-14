import http from "./httpService";

const endpoint = "/movies/";
export function getMovies() {
  return http.get(endpoint);
}

export function deleteMovie(movieId) {
  return http.delete(endpoint + movieId);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(endpoint + movie._id, body);
  } else {
    return http.post(endpoint, movie);
  }
}

export function getMovie(movieId) {
  return http.get(endpoint + movieId);
}
