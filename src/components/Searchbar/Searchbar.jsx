import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = { searchQuery: '', perPage: 12 };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState(() => ({
      [name]: value.trim(),
    }));
  };

  handleSubmit = e => {
    e.preventDefault();

    // =============== Вариант без кол-ва на страничке ================
    // this.props.onSubmit(this.state.searchQuery);

    this.props.onSubmit(this.state.searchQuery, this.state.perPage);
    this.setState(() => ({ searchQuery: '' }));
    e.target.reset();
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.buttonLabel}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Знайти фото"
            onChange={this.handleChange}
          />

         
        </form>
      </header>
    );
  }
}

