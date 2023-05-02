import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    searchTerm: '',
  };

  searchHandler = inputValue => {
    this.setState({ searchTerm: inputValue });
  };

  render() {
    return (
      <AppContainer>
        <Searchbar onSubmit={this.searchHandler} />
        <ImageGallery searchTerm={this.state.searchTerm} />
      </AppContainer>
    );
  }
}
