import { Component } from 'react';
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

export class App extends Component {
  state = {
    searchTerm: '',
    images: [],
    status: 'idle',
    isLoading: false,
    page: 1,
    totalPages: 0,
    error: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchTerm !== this.state.searchTerm ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          status: Status.PENDING,
          isLoading: true,
          page:
            prevState.searchTerm !== this.state.searchTerm
              ? 1
              : this.state.page,
        });

        const result = await getImages(this.state.searchTerm, this.state.page);
        if (result.data.totalHits === 0) {
          return this.setState({
            images: [],
            status: Status.REJECTED,
          });
        }

        this.setState({
          images:
            prevState.searchTerm === this.state.searchTerm &&
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

  searchHandler = inputValue => {
    this.setState({ searchTerm: inputValue });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, status, isLoading, error, page, totalPages } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.searchHandler} />
        {isLoading && <Loader />}
        {this.state.status === 'rejected' && (
          <div>
            Sorry, there are no images matching your search query. Please try
            again.
          </div>
        )}
        {error && <div>{error}</div>}
        <ImageGallery images={images} />
        {images.length > 0 && status !== 'pending' && page <= totalPages && (
          <Button onClick={this.onLoadMore}>Load More</Button>
        )}
      </AppContainer>
    );
  }
}
