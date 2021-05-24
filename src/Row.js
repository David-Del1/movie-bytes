import React, { useState, useEffect } from 'react';
import './Row.css';
import axios from './axios';

const base_url = 'https://image.tmdb.org/t/p/original';

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  // A snippet of code which runs based on a specific condition
  useEffect(() => {
    // if [], run once when the row loads, and don't run again
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row_posters'>
        {movies.map((movie) => (
          <img
          key={movie.id}
          className="row_poster"
          src={`${base_url}${movie.poster_path}`} 
          alt={movie.name} />
        ))}
      </div>
    </div>
  );
}

export default Row;
