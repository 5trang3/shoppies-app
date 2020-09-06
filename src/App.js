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
      nominations: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.fetchMovies()
    }
  }

  fetchMovies = () => {
    superagent.get('http://www.omdbapi.com')
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

  render() {
    return (
      <Container>
        <CustomBanner limitReached={ this.limitReached }/>
        <SearchBar value={ this.state.search } onChange={ (newSearch) => this.setState({ search: newSearch }) } onCancelSearch={ () => this.setState({ search: '' })}/>
        <SearchResults results={ this.state.searchResults } movies={ this.state.movies } addMovie={ this.addMovie } isNominated={ this.isNominated }/>
        <NominatedMoviesDisplay nominations={ this.state.nominations } movies={ this.state.movies } removeMovie={ this.removeMovie }/>
      </Container>
    )
  }
}

export default App
