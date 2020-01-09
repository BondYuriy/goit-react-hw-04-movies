import React, { Component, lazy } from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../routes';
import * as API from '../service/api';

const MovieCast = lazy(() =>
  import(
    '../components/MovieCast/MovieCast' /* webpackChunkName: "movie-cast" */
  ),
);

const MovieReviews = lazy(() =>
  import(
    '../components/MovieReviews/MovieReviews' /* webpackChunkName: "movie-reviews" */
  ),
);

export default class MovieDetailsPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({
          pathname: PropTypes.string.isRequired,
          search: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    movie: null,
  };

  componentDidMount() {
    const { match } = this.props;
    const id = match.params.movieId;

    API.getDataById(id).then(movie => this.setState({ movie }));
  }

  onGoBack = () => {
    const { history, location } = this.props;

    history.push(location.state.from);
  };

  render() {
    const { movie } = this.state;
    const { location } = this.props;

    return (
      <div>
        {movie && (
          <>
            <div>
              <button type="button" onClick={this.onGoBack}>
                Go back
              </button>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.name || movie.title}
                />
              </div>
              <div>
                <h1>{movie.name || movie.title}</h1>
                <p>{`User score: ${movie.vote_average * 10}%`}</p>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>
            </div>
            <div>
              <h4>Additional information</h4>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: `${routes.MOVIES}/${movie.id}/cast`,
                      state: { from: location },
                    }}
                  >
                    Cast
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: `${routes.MOVIES}/${movie.id}/reviews`,
                      state: { from: location },
                    }}
                  >
                    Reviews
                  </Link>
                </li>
              </ul>

              <Route
                path={routes.MOVIE_REVIEWS}
                render={props => <MovieReviews {...props} id={movie.id} />}
              />
              <Route
                path={routes.MOVIE_CAST}
                render={props => <MovieCast {...props} id={movie.id} />}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
