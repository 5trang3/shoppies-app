import React from 'react';
import NominatedMovie from './NominatedMovie.js'

export default (props) => {

  let renderNominatedMovies = () => {
    return props.nominations.map(id => <NominatedMovie nominatedMovie={ props.movies[id] } removeMovie={ props.removeMovie } id={ id }/>)
  }
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
  }
  return (
    <div style={ style }>
      { renderNominatedMovies() }
    </div>
  )
}
