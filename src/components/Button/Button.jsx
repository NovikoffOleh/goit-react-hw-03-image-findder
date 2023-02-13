import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './Button.module.css';

export default class Button extends Component {
  static propTypes = { onClick: PropTypes.func.isRequired };

  render() {
    return (
      <button type="button" className={s.button} onClick={this.props.onClick}>
        Шукати ще
      </button>
    );
  }
}
