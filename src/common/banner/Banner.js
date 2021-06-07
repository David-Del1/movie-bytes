import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';

// you can put utility function here, don't nest in class:
function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}


export default class Banner extends Component {
  // Don't mix state management styles. This component isn't much better with hooks.
  // const [movie, setMovie] = useState([]);
  state = {
    movie: null
  }

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await request
  //       .get(URL + fetchUrl)
  //       .set('Authorization', window.localStorage.getItem('TOKEN'));
  //     setMovie(
  //       response.body[Math.floor(Math.random() * response.body.length - 1)]
  //     );
  //     // return response;
  //   }
  //   fetchData();
  // }, []);

  async componentDidMount() {
    // Not sure why this component isn't using your server...
    // Do this on the server, and filter for a random one there.
    // response.body[Math.floor(Math.random() * response.body.length - 1)]
    this.setState({ movie: await getPopularMovie() });
  }

  render() {

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

          {/* Not a semantic header */}
          {/* Checkout css ellipse to do this based on layout width */}
          <p className='banner_description'>{truncate(movie?.overview, 180)}</p>

        </div>
      </header>
    );
  }
}
