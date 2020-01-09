import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as API from '../../service/api';

export default class MovieCast extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  state = {
    casts: null,
  };

  componentDidMount() {
    const { id } = this.props;

    API.getDataCast(id).then(data => this.setState({ casts: data }));
  }

  render() {
    const { casts } = this.state;

    return (
      <div>
        {casts && (
          <ul>
            {casts.map(cast => {
              const { id, name, character, profile_path: img } = cast;

              return (
                <li key={id}>
                  {img && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${img}`}
                      alt={name}
                      width="100"
                    />
                  )}
                  <h4>{name}</h4>
                  <p>{`character: ${character}`}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
