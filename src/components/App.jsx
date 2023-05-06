import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';
import { getImages } from 'services/API';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ERROR_MSG = 'Error happend';

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm === '') {
      return;
    }
    const controller = new AbortController();
    async function fetchData() {
      try {
        setStatus(Status.PENDING);
        setIsLoading(true);
        const result = await getImages(searchTerm, page, {
          signal: controller.signal,
        });
        if (result.data.totalHits === 0) {
          setImages([]);
          setStatus(Status.REJECTED);
          return;
        }
        setImages(prevImages => [...prevImages, ...result.data.hits]);
        setIsLoading(false);
        setStatus(Status.RESOLVED);
        setTotalPages(Math.floor(result.data.totalHits / 12));
      } catch (error) {
        setError(ERROR_MSG);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => {
      controller.abort();
    };
  }, [searchTerm, page]);

  const searchHandler = inputValue => {
    setSearchTerm(inputValue);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={searchHandler} />
      {isLoading && <Loader />}
      {status === 'rejected' && (
        <div>
          Sorry, there are no images matching your search query. Please try
          again.
        </div>
      )}
      {error && <div>{error}</div>}
      <ImageGallery images={images} />
      {images.length > 0 && status !== 'pending' && page <= totalPages && (
        <Button onClick={onLoadMore}>Load More</Button>
      )}
    </AppContainer>
  );
};
