import React from 'react';
import Container from '@material-ui/core/Container'
import SearchBar from 'material-ui-search-bar'
import SearchResults from './components/SearchResults.js'

const superagent = require('superagent');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      results: [],
      nominations: []
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
                'plot': 'short'
              })
              .then((res) => res.body.Error ? [] : res.body.Search.slice(0, 5))
              .then((results) => results.map((result) => ({
                title: result.Title,
                year: result.Year,
                image: result.Poster
              })))
              .then((parsedResults) => this.setState({
                results: parsedResults
              }))
  }

  render() {
    return (
      <Container>
        <SearchBar value={ this.state.search } onChange={ (newSearch) => this.setState({ search: newSearch }) } onCancelSearch={ () => this.setState({ search: '' })}/>
        <SearchResults results={ this.state.results }/>
      </Container>
    )
  }
}

export default App
