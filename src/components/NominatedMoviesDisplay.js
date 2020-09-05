import React from 'react';
import NominatedMovie from './NominatedMovie.js'

export default (props) => {

  let renderNominatedMovies = (nominatedMovies) => nominatedMovies.map(nominatedMovie => <NominatedMovie { ...nominatedMovie } />)
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
