import React, { useState, useEffect } from 'react'
import './Row.css';

function Row({ title }) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <h2>{title}</h2>

      {/* container -> posters*/}

    </div>
  )
}

export default Row
