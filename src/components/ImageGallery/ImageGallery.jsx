import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ImageGalleryItem } from 'components';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  static propTypes = {
    imagesData: PropTypes.arrayOf(PropTypes.object).isRequired,
    modalOpen: PropTypes.func.isRequired,
  };

  render() {
    const { imagesData, modalOpen } = this.props;
    return (
      <ul id="gallery" className={s.gallery}>
        {imagesData.length > 0 &&
          imagesData.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                tags={image.tags}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                modalOpen={modalOpen}
              />
            );
          })}
      </ul>
    );
  }
}
