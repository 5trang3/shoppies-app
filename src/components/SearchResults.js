import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';

const listItemStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  }})
const listItemTextStyles = makeStyles({
  root: {
    flexBasis: '300px',
    flexGrow: '0'
  }})
const iconButtonStyles = makeStyles({
  root: {
    flexBasis: '48px',
  }})

export default (props) => {

  const listItemClasses = listItemStyles();
  const listItemTextClasses = listItemTextStyles();
  const iconButtonClasses = iconButtonStyles();

  let renderResults = () => props.results.map((result) => (
    <ListItem dense className={ listItemClasses.root }>
      <img src={ result.image } style={{ flexBasis: '50px', marginRight: '10px' }}></img>
      <ListItemText primary={ result.title } secondary={ result.year } className={ listItemTextClasses.root } primaryTypographyProps={{ className: listItemTextClasses.primary }} secondaryTypographyProps={{ className: listItemTextClasses.secondary }}/>
      <IconButton className={ iconButtonClasses.root } onClick={ () => props.addMovie(result) } disabled={ props.isNominated(result) }>
        <AddIcon />
      </IconButton>
    </ListItem>
  ))

  return (
    <List>
      { renderResults() }
    </List>
  )
}
