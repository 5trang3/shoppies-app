import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';

const cardStyles = makeStyles({
  root: {
    margin: '5px',
    height: '450px',

  }
})
const cardMediaStyles = makeStyles({
  root: {
    height: '350px',
    width: '235px'
  }
})
const cardHeaderStyles = makeStyles({
  root: {
    width: '165px',
    padding: '10px',
    paddingRight: '0',
    alignItems: 'flex-start'
  },
})
const cardActionsStyles = makeStyles({
  root: {
    width: '50px',
    padding: '5px',
    alignItems: 'flex-start'
  }
})

export default (props) => {

  const cardClasses = cardStyles();
  const cardMediaClasses = cardMediaStyles();
  const cardHeaderClasses = cardHeaderStyles();
  const cardActionsClasses = cardActionsStyles();
  return (
    <Card className={ cardClasses.root }>
      <div style={{ height: '100px', display: 'flex' }}>
        <CardHeader title={ props.title } subheader={ props.year } className={ cardHeaderClasses.root } titleTypographyProps={ { variant: 'subtitle2' } }/>
        <CardActions className={ cardActionsClasses.root }>
        <IconButton>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
      </div>
      <CardMedia image={ props.image } title={ props.imageTitle } className={ cardMediaClasses.root }/>
    </Card>
  )
}
