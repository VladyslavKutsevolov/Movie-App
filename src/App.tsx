import React from 'react';
import { Container } from '@material-ui/core';
import Movies from './components/Movies';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Movies />
      </Container>
    </div>
  );
}

export default App;
