import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from '../service/api';
import routes from '../routes';

export default class HomePage extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape(),
    }).isRequired,
  };

  state = { items: [] };

  componentDidMount() {
    API.getData().then(data => this.setState({ items: data }));
  }

  render() {
    const { items } = this.state;
    const { location } = this.props;

    return (
      <>
        <h1>Daily trend:</h1>
        <ul>
          {items.map(item => {
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
      </>
    );
  }
}
