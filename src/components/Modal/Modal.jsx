import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    console.log('mount ', this.props.modalInfo);
  }

  componentDidUpdate() {
    console.log('update ', this.props.modalInfo);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onBackdropeClick);
  }

  onBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
      console.log('click ', this.props.modalInfo);
    }
  };

  onKeyDown = e => {
    if (e.code === `Escape`) {
      this.props.onModalClose();
      console.log('key ', this.props.modalInfo);
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.modalData;
    return createPortal(
      <Overlay onClick={this.onBackdropClick}>
        <ModalWindow>
          <img src={largeImageURL} alt={tags} />
        </ModalWindow>
      </Overlay>,
      document.querySelector('#modal-root')
    );
  }
}

// Modal.propTypes = {
//   modalData: PropTypes.shape({
//     tags: PropTypes.string.isRequired,
//     largeImageURL: PropTypes.string.isRequired,
//   }),
//   onModalClose: PropTypes.func.isRequired,
// };
