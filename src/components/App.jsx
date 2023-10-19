import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { getPictures } from '../services/api.js';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data = await getPictures(query, page);

        if (!data.totalHits) {
          Notiflix.Notify.failure(`Sorry, ${query} not found 😢`);
        } else {
          setImages(prevState => {
            if (page === 1) {
              return data.hits;
            }
            return [...prevState, ...data.hits];
          });
        }
      } catch (error) {
        Notiflix.Notify.failure(
          'Sorry! This site is temporarily unavailable due to a technical issue.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const clickHandler = () => {
    setPage(page + 1);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const search = form.elements.search.value;

    setQuery(search);
    setPage(1);
    setImages([]);
  };

  const openModal = selectedImage => {
    setActiveImage(selectedImage);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActiveImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="wrapper">
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {query && <ImageGallery images={images} onImageClick={openModal} />}
      {images.length > 11 && <Button handleClick={clickHandler} />}
      {isModalOpen && <Modal image={activeImage} onCloseModal={closeModal} />}
    </div>
  );
};
