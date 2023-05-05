import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ modalData, onModalClose }) => {
  const onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === `Escape`) {
        onModalClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onModalClose]);

  const { largeImageURL, tags } = modalData;
  return createPortal(
    <Overlay onClick={onBackdropClick}>
      <ModalWindow>
        <img src={largeImageURL} alt={tags} />
      </ModalWindow>
    </Overlay>,
    document.querySelector('#modal-root')
  );
};

Modal.propTypes = {
  modalData: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func.isRequired,
};
