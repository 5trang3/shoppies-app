import React from 'react';
import NominatedMovie from './NominatedMovie.js'

export default (props) => {

  let renderNominatedMovies = (nominatedMovies) => nominatedMovies.map(nominatedMovie => <NominatedMovie { ...nominatedMovie } />)
  return renderNominatedMovies(props.nominatedMovies)
}
