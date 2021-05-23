const MOVIE_API_KEY = '9b1498c70926d3dc7d8c69e02e1f5341';

const requests = {
  fetchTrending: `/trending/all/week?api_key=${MOVIE_API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${MOVIE_API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${MOVIE_API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=99`,
};

export default requests;