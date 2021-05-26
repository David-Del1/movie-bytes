import React, { useState, useEffect } from 'react';
import request from 'superagent';
import './Row.css';
import { fetchMovieData } from './utils/movies-api';
import { Link } from 'react-router-dom';

const URL = 'http://localhost:8001';

function Row({ title, fetchUrl }) {
  const [{ movies: [], favorites: [] }, setMovies] = useState({});
  // console.log(isLargeRow);
  // A snippet of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and don't run again

    async function fetchMovieData() {
      const response = await
        request.get(URL + fetchUrl)
          .set('Authorization', window.localStorage.getItem('TOKEN'));
      const data = await Promise.all(
        response.body.map(async (movie) => {
          const response2 = await request.get(
            `${URL}/api/me/favorites/${movie.movieId}`
          ).set('Authorization', window.localStorage.getItem('TOKEN'));
          return response2.body.length > 0;
        })


      setMovies({ movies: response.body, favorites: data });
    }

    fetchMovieData();
  }, [fetchUrl]);



  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movies.map((movie, index) => (

          <Link to={`/movies/${movie.movieId}`}>
            <img
              key={movie.movieId}
              className="row_poster"
              src={movie.poster}
              alt={movie.name} />
            <button onClick={this.handleClick}> {favorites[index] ? '♥️' : '♡'}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Row;
