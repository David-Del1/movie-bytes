import React, { Component } from 'react';
import Header from '../common/header/Header';
import ToggleMyList from '../common/toggle-my-list/ToggleMyList.js';
import Vote from '../common/vote/Vote.js';
import {
  getVoteCounts,
  fetchMovieDetail,
  fetchMovieTrailerId,
} from '../common/utils/movies-api';
import './MovieDetail.css';

export default class MovieDetail extends Component {
  state = {
    movie: {},
    isMovieLoaded: false,
    movieTrailer: '',
    upVotes: 0,
    downVotes: 0,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    try {
      const [movie, movieTrailer] = await Promise.all([
        fetchMovieDetail(id),
        fetchMovieTrailerId(id),
      ]);

      this.setState({
        movie,
        movieTrailer,
      });
      
      const { upVotes, downVotes } = await getVoteCounts(movie.movieId);
      
      this.setState({
        upVotes,
        downVotes,
      });

    } catch (err) {
      console.log(err.message);
    } finally {
      this.setState({ isMovieLoaded: true });
    }
  }

  handleVoteCounts = async () => {
    const { movie } = this.state;
    const { upVotes, downVotes } = await getVoteCounts(movie.movieId);
    this.setState({ upVotes, downVotes });
  };

  render() {
    const { movie, isMovieLoaded, movieTrailer, upVotes, downVotes } =
      this.state;
    const { history, onUser, onSearch } = this.props;
    return (
      <div>
        <Header history={history} onUser={onUser} onSearch={onSearch} />
        <div
          className='MovieDetail'
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >

          <h1>{movie.title}</h1>

          <iframe
            width='800'
            height='444'
            src={`https://www.youtube.com/embed/${movieTrailer}`}
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
            className='trailer'
          ></iframe>

          <p className='movie-overview'>{movie.overview}</p>

          {isMovieLoaded ? (
            <Vote
              movie={movie}
              voteCounts={{ upVotes, downVotes }}
              updateVoteCounts={this.handleVoteCounts}
            />
          ) : (
            '...loading'
          )}

          {isMovieLoaded ? <ToggleMyList movie={movie} /> : '...loading'}
          
        </div>
      </div>
    );
  }
}
