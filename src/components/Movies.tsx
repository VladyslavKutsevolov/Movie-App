import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';

// interface IState {
//   search: string;
//   results: any[];
//   se
// }

const Movies = () => {
  const [state, setState] = useState({
    search: '',
    results: [],
    selected: {}
  });
  const apiURL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&s=${state.search}`;

  const handleSearchInput = ({ target }: ChangeEvent<{ value: string }>) => {
    setState(prevState => ({ ...prevState, search: target.value }));
  };

  const onSearch = async (e: KeyboardEvent) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      try {
        const { data } = await axios.get(apiURL);
        setState({ ...state, results: data });
      } catch (e) {
        console.log('err', e);
      }
    }
  };

  console.log(state);

  return (
    <div>
      <Search
        value={state.search}
        onChange={handleSearchInput}
        search={onSearch}
      />
    </div>
  );
};

export default Movies;
