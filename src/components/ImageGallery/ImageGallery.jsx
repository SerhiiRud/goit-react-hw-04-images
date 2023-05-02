import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from 'services/API';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { GalleryContainer } from './ImageGallery.styled';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ERROR_MSG = 'Error happend';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    isLoading: false,
    modalShown: false,
    imageData: { img: '', tags: '' },
    page: 1,
    totalPages: 0,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchTerm !== this.props.searchTerm ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          status: Status.PENDING,
          isLoading: true,
          page:
            prevProps.searchTerm !== this.props.searchTerm
              ? 1
              : this.state.page,
        });

        const result = await getImages(this.props.searchTerm, this.state.page);
        if (result.data.totalHits === 0) {
          return this.setState({
            images: [],
            status: Status.REJECTED,
          });
        }

        this.setState({
          images:
            prevProps.searchTerm === this.props.searchTerm &&
            this.state.page !== 1
              ? [...prevState.images, ...result.data.hits]
              : [...result.data.hits],
          status: Status.RESOLVED,
          totalPages: Math.floor(result.data.totalHits / 12),
        });
      } catch (error) {
        this.setState({ error: ERROR_MSG });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onModalShow = imageData => {
    this.setState({ imageData, modalShown: true });
  };

  onModalClose = () => {
    this.setState({ modalShown: false });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const {
      images,
      status,
      isLoading,
      modalShown,
      imageData,
      error,
      page,
      totalPages,
    } = this.state;
    return (
      <>
        {isLoading && <Loader />}
        {this.state.status === 'rejected' && (
          <div>
            Sorry, there are no images matching your search query. Please try
            again.
          </div>
        )}
        {error && <div>{error}</div>}
        <GalleryContainer>
          {[...images].map(image => (
            <ImageGalleryItem
              key={image.id}
              imageData={image}
              onImgClick={this.onModalShow}
            ></ImageGalleryItem>
          ))}
        </GalleryContainer>
        {images.length > 0 && status !== 'pending' && page <= totalPages && (
          <Button onClick={this.onLoadMore}>Load More</Button>
        )}
        {modalShown && (
          <Modal modalData={imageData} onModalClose={this.onModalClose} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
