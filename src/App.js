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
      results: {},
      nominations: {}
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.fetchSearchResults()
    }
  }

  fetchSearchResults = () => {
    superagent.get('http://www.omdbapi.com')
              .query({
                's': this.state.search,
                'apikey': process.env.REACT_APP_OMDB_API_KEY,
                'type': 'movie',
              })
              .then((res) => res.body.Error ? [] : res.body.Search.slice(0, 5))
              .then(results => results.reduce((resultsObj, result) => {
                resultsObj[result.imdbID] = {
                  title: result.Title,
                  year: result.Year,
                  image: result.Poster
                };
                return resultsObj
              }, {}))
              .then(resultsObj => this.setState({
                results: resultsObj
              }))
  }

  isNominated = (id) => this.state.nominations[id] ? true : false

  limitReached = () => Object.keys(this.state.nominations).length >= 5;

  addMovie = (id) => {
    if (!this.limitReached() && !this.isNominated(id)) {
      this.setState(state => {
        const nominations = state.nominations;
        nominations[id] = state.results[id];
        return { nominations: nominations }
      })
    }
  }

  removeMovie = (id) => this.setState(state => {
    let nominations = state.nominations;
    delete nominations[id];
    return { nominations: nominations }
  })

  render() {
    return (
      <Container>
        <CustomBanner limitReached={ this.limitReached }/>
        <SearchBar value={ this.state.search } onChange={ (newSearch) => this.setState({ search: newSearch }) } onCancelSearch={ () => this.setState({ search: '' })}/>
        <SearchResults results={ this.state.results } addMovie={ this.addMovie } isNominated={ this.isNominated }/>
        <NominatedMoviesDisplay nominatedMovies={ this.state.nominations } removeMovie={ this.removeMovie }/>
      </Container>
    )
  }
}

export default App
