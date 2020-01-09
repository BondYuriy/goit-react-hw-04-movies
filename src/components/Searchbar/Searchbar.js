import React, { Component } from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  search: '',
};

export default class Searchbar extends Component {
  static propTypes = {
    onSubmitQuery: PropTypes.func.isRequired,
  };

  state = { ...INITIAL_STATE };

  handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;

    this.setState({
      [name]: value,
    });
  };

  submitForm = evt => {
    evt.preventDefault();

    const { search } = this.state;
    const { onSubmitQuery } = this.props;

    onSubmitQuery(search);

    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { search } = this.state;

    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.submitForm}>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="search"
            value={search}
            onChange={this.handleChange}
          />
          <button type="submit" className="button">
            <span className="label">Search</span>
          </button>
        </form>
      </header>
    );
  }
}
