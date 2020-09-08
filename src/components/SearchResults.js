import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

const listItemStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '3px'
  }})
const listItemTextStyles = makeStyles({
  root: {
    flexBasis: '150px',
    flexGrow: '0',
    margin: '0'
  }})
const iconButtonStyles = makeStyles({
  root: {
    flexBasis: '48px',
  }})
const listStyles = makeStyles({
  root: {
    flexBasis: '250px',
    flexShrink: '0',
    marginRight: '5px'
  }
})
export default (props) => {

  const listItemClasses = listItemStyles();
  const listItemTextClasses = listItemTextStyles();
  const iconButtonClasses = iconButtonStyles();
  const listClasses = listStyles();

  let renderResults = () => {
    return props.results.map(id => (
      <ListItem dense className={ listItemClasses.root } onMouseEnter={ () => props.setActive(id) } onMouseLeave={ () => props.setActive([]) } key={ id }>
        <img src={ props.movies[id].image } style={{ width: '50px', marginRight: '10px' }} alt={ 'Movie poster for ' + props.movies[id].title }></img>
        <ListItemText primary={ props.movies[id].title } secondary={ props.movies[id].year } className={ listItemTextClasses.root } primaryTypographyProps={{ className: listItemTextClasses.primary }} secondaryTypographyProps={{ className: listItemTextClasses.secondary }}/>
        <Tooltip title='Nominate this Movie'>
          <IconButton className={ iconButtonClasses.root } onClick={ () => props.addMovie(id) } disabled={ props.isNominated(id) }>
            <AddIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
    ))
  }

  return (
    <List className={ listClasses.root }>
      { renderResults() }
    </List>
  )
}
