import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Searchbar from '../components/Searchbar/Searchbar';
import * as API from '../service/api';
import routes from '../routes';

export default class MoviesPage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    movies: [],
  };

  componentDidMount() {
    const { location } = this.props;

    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      API.getDataQuery(query).then(data => this.setState({ movies: data }));
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    const prevQuery = new URLSearchParams(prevProps.location.search).get(
      'query',
    );
    const nexqQuery = new URLSearchParams(location.search).get('query');

    if (prevQuery !== nexqQuery) {
      API.getDataQuery(nexqQuery).then(data => this.setState({ movies: data }));
    }
  }

  onSubmitQuery = query => {
    const { history, location } = this.props;

    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  render() {
    const { movies } = this.state;
    const { location } = this.props;

    return (
      <div>
        <Searchbar onSubmitQuery={this.onSubmitQuery} />
        {movies.length > 0 && (
          <ul>
            {movies.map(item => {
              const { id, name, title } = item;

              return (
                <li key={id}>
                  <Link
                    to={{
                      pathname: `${routes.MOVIES}/${id}`,
                      state: { from: location },
                    }}
                  >
                    {name || title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
