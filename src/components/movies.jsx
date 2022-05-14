import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { toast } from "react-toastify";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [...data, { _id: "", name: "All Genres" }];
    const { data: movies } = await getMovies();
    this.setState({ movies: movies, genres: genres });
  }

  handleDelete = async (movieId) => {
    const originalMovies = this.state.movies;
    const movies = this.state.movies.filter((m) => m._id !== movieId);
    this.setState({ movies });

    try {
      await deleteMovie(movieId);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("movie already been deleted");
      }
      this.setState({ movieId: originalMovies });
    }
  };

  handleLike = (movie) => {
    // update state and then update db
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (selectedGenre) => {
    this.setState({ selectedGenre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  getPageData = () => {
    const {
      sortColumn,
      selectedGenre,
      movies: allMovies,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(pageSize, sorted, currentPage);
    return { data: movies, totalCount: filtered.length };
  };

  render() {
    // const { length: moviesCount } = this.state.movies;
    // if (!moviesCount) return <p>There are no movies left</p>;

    const {
      sortColumn,
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPageData();
    const { user } = this.props;
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              className="btn btn-parimary"
              to="/movies/new"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
          <p>There are {totalCount} Movies : </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            currentPage={currentPage}
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Movies;
