import {
  SearchContainer,
  SearchForm,
  SearchButton,
  SearchInput,
  ButtonLabel,
} from './Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  return (
    <SearchContainer>
      <SearchForm
        onSubmit={e => {
          e.preventDefault();
          onSubmit(e.currentTarget.elements[1].value);
          e.currentTarget.reset();
        }}
      >
        <SearchButton type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </SearchButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
