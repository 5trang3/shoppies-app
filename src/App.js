import React from 'react';
import Container from '@material-ui/core/Container'
import SearchBar from 'material-ui-search-bar'
import SearchResults from './components/SearchResults.js'
import NominatedMoviesDisplay from './components/NominatedMoviesDisplay.js'
import CustomBanner from './components/CustomBanner.js'
import SearchResultDetails from './components/SearchResultDetails.js'

const superagent = require('superagent');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      movies: {},
      searchResults: [],
      nominations: [],
      active: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.fetchMovies()
    };
    if (this.state.active[0] !== prevState.active[0] && this.state.active[0].length !== 0) {
      this.fetchMovieDetails(this.state.active[0])
    }
  }

  fetchMovies = () => {
    superagent.get('https://www.omdbapi.com')
    .query({
      s: this.state.search,
      apikey: process.env.REACT_APP_OMDB_API_KEY,
      type: 'movie',
    })
    .then(res => {
      let results = res.body.Error ? [] : res.body.Search.slice(0, 5);
      const nominations = this.state.nominations;
      let movies = this.state.movies;
      for (const id in movies) {
        if (!nominations.includes(id)) {
          delete movies[id]
        }
      }
      movies = results.reduce((movies, result) => {
        movies[result.imdbID] = {
          title: result.Title,
          image: result.Poster,
          year: result.Year
        }
        return movies;
      }, movies);
      results = results.map(result => result.imdbID)
      this.setState({
        movies: movies,
        searchResults: results
      })
    })
  }

  isNominated = (id) => this.state.nominations.includes(id)

  limitReached = () => this.state.nominations.length >= 5;

  addMovie = (id) => {
    if (!this.limitReached() && !this.isNominated(id)) {
      this.setState(state => {
        const nominations = state.nominations;
        nominations.push(id);
        return { nominations: nominations }
      })
    }
  }

  removeMovie = (id) => this.setState(state => {
    const nominations = state.nominations;
    const updatedNominations = nominations.filter(nomination => nomination !== id);
    return { nominations: updatedNominations }
  })

  fetchMovieDetails = (id) => {
    if (!this.state.movies[id].details) {
      superagent.get('http://www.omdbapi.com')
      .query({
        i: id,
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        plot: 'short'
      })
      .then(res => {
        const movies = this.state.movies;
        movies[id].plot = res.body.Plot;
        movies[id].rating = res.body.imdbRating;
        movies[id].cast = res.body.Actors;
        movies[id].awards = res.body.Awards
        this.setState({ movies: movies });
      })
    }
  }

  setActive = (id) => this.setState({ active: [id] })

  render() {
    return (
      <Container>
        <CustomBanner limitReached={ this.limitReached }/>
        <SearchBar value={ this.state.search } onChange={ (newSearch) => this.setState({ search: newSearch }) } onCancelSearch={ () => this.setState({ search: '' })}/>
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <SearchResults results={ this.state.searchResults } movies={ this.state.movies } addMovie={ this.addMovie } isNominated={ this.isNominated } setActive={ this.setActive }/>
          <SearchResultDetails movies={ this.state.movies } active={ this.state.active }/>
        </div>
        <NominatedMoviesDisplay nominations={ this.state.nominations } movies={ this.state.movies } removeMovie={ this.removeMovie }/>
      </Container>
    )
  }
}

export default App
