import React, { Component } from 'react';
import { Report } from 'notiflix';

import {
  Button,
  ImageGallery,
  Loader,
  Modal,
  PixabayAPI,
  Searchbar,
} from './index';

export class App extends Component {
  static propTypes = {};

  state = {
    searchQuery: '',
    currentPage: 1,
    imagesData: [],
    perPage: 12,
    isMoreImages: 1,
    isLoading: false,
    modal: { src: '', alt: '', isOpen: false },
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchQuery === '') {
      Report.warning('Please enter your search query');
      return;
    }
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ isLoading: true });
      this.fetchImages();
    }
  }

  // =============== Вариант без кол-ва на страничке ================
  // handleSearchQuery = searchQuery => {
  //   this.setState(() => ({ searchQuery: searchQuery, currentPage: 1 }));
  // };

  handleSearchQuery = (searchQuery, perPage) => {
    this.setState(() => ({
      searchQuery: searchQuery,
      perPage: perPage,
      currentPage: 1,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  handleOpenModal = (large, alt) => {
    this.setState({ modal: { src: large, alt, isOpen: true } });
  };

  handleCloseModal = () => {
    this.setState({ modal: { isOpen: false } });
  };

  addSmoothScroll = () => {
    const { height: cardHeight } = document
      .getElementById('gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  fetchImages = async () => {
    const { searchQuery, currentPage, perPage } = this.state;
    const imagesData = await PixabayAPI(searchQuery, currentPage, perPage);
    if (currentPage === 1) {
      this.setState(() => ({
        imagesData: imagesData.data.hits,
        isMoreImages: imagesData.data.totalHits / this.state.perPage,
      }));
      window.scrollTo({
        top: 0,
      });
    } else {
      this.setState(prevState => ({
        imagesData: [...prevState.imagesData, ...imagesData.data.hits],
      }));
      this.addSmoothScroll();
    }
    this.setState({ isLoading: false });
  };

  render() {
    const {
      imagesData,
      isLoading,
      isMoreImages,
      currentPage,
      modal: { src, alt, isOpen },
    } = this.state;
    const isLoadMore = isMoreImages > currentPage && !isLoading;
    return (
      <div className="app">
        <Searchbar onSubmit={this.handleSearchQuery} />
        <main>
          <ImageGallery
            imagesData={imagesData}
            modalOpen={this.handleOpenModal}
          />
          {isLoadMore && <Button onClick={this.handleLoadMore} />}
          {isLoading && <Loader />}
          {isOpen && (
            <Modal src={src} alt={alt} modalClose={this.handleCloseModal} />
          )}
        </main>
      </div>
    );
  }
}
