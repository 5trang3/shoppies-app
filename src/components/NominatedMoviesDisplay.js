import React from 'react';
import NominatedMovie from './NominatedMovie.js'

export default (props) => {

  let renderNominatedMovies = (nominatedMovies) => {
    const ids = Object.keys(nominatedMovies);
    return ids.map(id => <NominatedMovie nominatedMovie={ nominatedMovies[id] } removeMovie={ props.removeMovie } id={ id }/>)
  }
  const style = {
    display: 'flex',
    flexWrap: 'wrap',
  }
  return (
    <div style={ style }>
      { renderNominatedMovies(props.nominatedMovies) }
    </div>
  )
}
