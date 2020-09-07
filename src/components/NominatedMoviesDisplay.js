import React from 'react';
import NominatedMovie from './NominatedMovie.js'
import '../styles/NominatedMoviesDisplay.css'

export default (props) => {

  let renderNominatedMovies = () => {
    return props.nominations.map(id => <NominatedMovie nominatedMovie={ props.movies[id] } removeMovie={ props.removeMovie } id={ id }/>)
  }

  return (
    <div id='nominations-container'>
      { renderNominatedMovies() }
    </div>
  )
}
