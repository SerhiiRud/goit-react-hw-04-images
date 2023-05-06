import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ imageObject }) => {
  const { webformatURL, tags } = imageObject;
  const [isModalShown, setIsModalShown] = useState(false);
  const [imageData, setImageData] = useState({ img: '', tags: '' });

  const onModalShow = (largeImageURL, tags) => {
    setIsModalShown(true);
    setImageData({ img: largeImageURL, tags });
  };

  const onModalClose = () => {
    setIsModalShown(false);
  };

  return (
    <GalleryItem>
      <>
        <GalleryItemImage
          onClick={e => {
            e.preventDefault();
            onModalShow(imageData);
          }}
          src={webformatURL}
          alt={tags}
        />
        {isModalShown && (
          <Modal modalData={imageObject} onModalClose={onModalClose} />
        )}
      </>
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageObject: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

GalleryItemImage.propTypes = {
  onClick: PropTypes.func.isRequired,
};
