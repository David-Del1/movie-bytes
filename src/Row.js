import React, { useState, useEffect } from 'react';
import request from 'superagent';
import './Row.css';
import { fetchMovieData } from './utils/movies-api';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:8001';

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  // console.log(isLargeRow);
  // A snippet of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and don't run again

    async function fetchMovieData() {
      const response = await
        request.get(URL + fetchUrl)
          .set('Authorization', window.localStorage.getItem('TOKEN'));
      setMovies(response.body);
    }

    fetchMovieData();
  }, [fetchUrl]);



  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movies.map((movie) => (
          <Link to={`/movies/${movie.movieId}`}>
            <img
              key={movie.movieId}
              className="row_poster"
              src={movie.poster}
              alt={movie.name} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Row;
