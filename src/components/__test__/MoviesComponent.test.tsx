import { render, screen } from '../../test-utils/testing-library';
import Movies from '../Movies';
import { findByRole, waitFor } from '@testing-library/react';

describe('Movies Component', () => {
  it('should render', async () => {
    render(
      <Movies
        state={{
          search: '',
          movies: []
        }}
        favMovies={{ movies: [] }}
        moviesPerPage={6}
        setFavMovies={jest.fn()}
        setState={jest.fn()}
        removeFormFavorite={jest.fn()}
        addToFavorite={jest.fn()}
        error={{ msg: '' }}
        setError={jest.fn()}
        loading={false}
        setLoading={jest.fn()}
        setSlideSearch={jest.fn()}
        slideSearch={false}
      />
    );

    await waitFor(() => {
      const input = screen.findByPlaceholderText(/search for a movie/i);
    });
  });
});
