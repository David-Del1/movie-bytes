import React, { useState, useEffect } from 'react';
import request from 'superagent';
import './Banner.css'
const URL = 'http://localhost:8001';

function Banner({ fetchUrl }) {

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await request.get(URL + fetchUrl)
        .set('Authorization', window.localStorage.getItem('TOKEN'));
      setMovie(
        response.body[
        Math.floor(Math.random() * response.body.length - 1)
        ]
      );
      // return response;
    }
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }


  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop}"
      )`,
        backdropPosition: "center center"
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {truncate(movie?.overview, 150)}

        </h1>

      </div>

    </header>
  )
}

export default Banner
