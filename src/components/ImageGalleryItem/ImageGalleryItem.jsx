import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    modalOpen: PropTypes.func.isRequired,
  };

  handleImgClick = e => {
    e.preventDefault();
    const { largeImageURL, tags } = this.props;
    this.props.modalOpen(largeImageURL, tags);
  };

  render() {
    const { webformatURL, tags } = this.props;
    return (
      <li className={s.item}>
        <img
          src={webformatURL}
          alt={tags}
          className={s.img}
          onClick={this.handleImgClick}
        />
      </li>
    );
  }
}
