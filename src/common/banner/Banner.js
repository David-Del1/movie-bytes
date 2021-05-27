import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import request from 'superagent';
import MovieDetail from '../../movie-detail/MovieDetail';
import './Banner.css';
const URL = '';

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await request
        .get(URL + fetchUrl)
        .set('Authorization', window.localStorage.getItem('TOKEN'));
      setMovie(
        response.body[Math.floor(Math.random() * response.body.length - 1)]
      );
      // return response;
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop}"
      )`,
        backdropPosition: 'center center',
      }}
    >
      <div className='banner_contents'>
        <h1 className='banner_title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className='banner_buttons'>
          <Link to={`/movies/${movie.movieId}`}>
            <button className='banner_button'>Watch Trailer</button>
          </Link>
          <button className='banner_button'>Add to My List</button>
        </div>
        <h1 className='banner_description'>{truncate(movie?.overview, 180)}</h1>
      </div>
    </header>
  );
}

export default Banner;
