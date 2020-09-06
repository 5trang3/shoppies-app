import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default (props) => {
  if (props.active.length === 1 && props.movies[props.active]) {
    return (
      <Card>
        <CardHeader title={ props.movies[props.active[0]].title } subheader={ props.movies[props.active[0]].year }/>
        <CardContent>
          <Typography variant='body1'>
            { props.movies[props.active[0]].plot }
          </Typography>
          <Typography variant='body2'>
            { props.movies[props.active[0]].cast + ' / ' + props.movies[props.active[0]].awards + ' / ' + props.movies[props.active[0]].rating}
          </Typography>
        </CardContent>
      </Card>
    )
  }
  else { return null }
}
