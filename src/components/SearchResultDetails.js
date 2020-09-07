import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const cardStyles = makeStyles({
  root: {
    flexGrow: '1'
  }
})

export default (props) => {
  const cardClasses = cardStyles();
  if (props.active.length === 1 && props.movies[props.active]) {
    return (
      <Card className={ cardClasses.root }>
        <CardHeader title={ props.movies[props.active[0]].title } subheader={ props.movies[props.active[0]].year }/>
        <CardContent>
          <Typography variant='body1' paragraph>
            { props.movies[props.active[0]].plot }
          </Typography>
          <Typography variant='body2' gutterBottom>
            { 'Cast: ' + props.movies[props.active[0]].cast }
          </Typography>
          <Typography variant='body2' gutterBottom>
            { 'IMDB Rating: ' + props.movies[props.active[0]].rating }
          </Typography>
          <Typography variant='body2' gutterBottom>
            { 'Awards: ' + props.movies[props.active[0]].awards }
          </Typography>
        </CardContent>
      </Card>
    )
  }
  else { return null }
}
