import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as API from '../../service/api';

export default class MovieReviews extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  state = {
    reviews: null,
  };

  componentDidMount() {
    const { id } = this.props;

    API.getDataReviews(id).then(data => this.setState({ reviews: data }));
  }

  render() {
    const { reviews } = this.state;

    return (
      <div>
        {reviews && (
          <ul>
            {reviews.map(review => {
              const { id, author, content } = review;

              return (
                <li key={id}>
                  <h4>{author}</h4>
                  <p>{`character: ${content}`}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
