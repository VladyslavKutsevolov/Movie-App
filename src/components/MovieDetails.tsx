import React from 'react';

interface Props {
  movie: any;
  close: () => void;
}

const MovieDetails = (props: Props) => {
  const { movie, close } = props;
  return (
    <section>
      <div>
        <h2>{movie.Title}</h2>
        <div>
          <img src={movie.Poster} alt="movie" />
          <p>{movie.Plot}</p>
        </div>
        <button type="button" onClick={close}>
          Close
        </button>
      </div>
    </section>
  );
};

export default MovieDetails;
