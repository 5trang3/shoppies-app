import React from 'react';
import NominatedMovie from './NominatedMovie.js'
import '../styles/NominatedMoviesDisplay.css'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

const typographyStyles = makeStyles({
  root: {
    marginLeft: '5px',
    textDecoration: 'underline'
  }
})

export default (props) => {

  const typographyClasses = typographyStyles();

  let renderNominatedMovies = () => {
    return props.nominations.map(id => <NominatedMovie nominatedMovie={ props.movies[id] } removeMovie={ props.removeMovie } id={ id } key={ id }/>)
  }

  return (
    <div>
      { props.nominations.length === 0 ? null : <Typography variant='h6' className={ typographyClasses.root }>Your Nominations</Typography> }
      <div id='nominations-container'>
        { renderNominatedMovies() }
      </div>
    </div>
  )
}
