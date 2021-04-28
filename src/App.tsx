import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { Container } from '@material-ui/core';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import FavMovies from './components/FavMovies';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>
          <Route path="/favorite">
            <FavMovies />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
