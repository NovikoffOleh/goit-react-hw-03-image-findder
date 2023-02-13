import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './Modal.module.css';

export default class Modal extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    modalClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.modalClose();
    }
  };

  handleModalClick = e => {
    if (e.target === e.currentTarget) {
      this.props.modalClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={s.overlay} onClick={this.handleModalClick}>
        <div className={s.modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    );
  }
}
