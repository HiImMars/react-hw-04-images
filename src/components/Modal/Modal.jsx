import css from './Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ image, onCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  // const { image } = props;

  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
};
