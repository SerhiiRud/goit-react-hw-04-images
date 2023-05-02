import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageData, onImgClick }) => {
  const { largeImageURL, tags } = imageData;
  return (
    <GalleryItem
      onClick={e => {
        e.preventDefault();
        console.log(1);
        onImgClick({ largeImageURL, tags });
      }}
    >
      <GalleryItemImage src={imageData.webformatURL} alt={imageData.tags} />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onImgClick: PropTypes.func.isRequired,
};
