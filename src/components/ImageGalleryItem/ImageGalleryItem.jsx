import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalShown: false,
    imageData: { img: '', tags: '' },
  };

  onModalShow = imageData => {
    this.setState({ imageData, isModalShown: true });
  };

  onModalClose = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    const { largeImageURL, webformatURL, tags } = this.props.imageData;
    return (
      <GalleryItem>
        <>
          <GalleryItemImage
            onClick={e => {
              e.preventDefault();
              this.onModalShow({ largeImageURL, tags });
            }}
            src={webformatURL}
            alt={tags}
          />
          {this.state.isModalShown && (
            <Modal
              modalData={this.props.imageData}
              onModalClose={this.onModalClose}
              modalInfo={this.state.isModalShown}
            />
          )}
        </>
      </GalleryItem>
    );
  }
}

// ImageGalleryItem.propTypes = {
//   imageData: PropTypes.shape({
//     tags: PropTypes.string.isRequired,
//     webformatURL: PropTypes.string.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//   }),
//   onImgClick: PropTypes.func.isRequired,
// };
