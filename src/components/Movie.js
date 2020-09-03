import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

export default (props) => {
  return (
    <Card>
      <CardHeader title={ props.title } subheader={ props.year }/>
      <CardMedia image={ props.image } title={ props.imageTitle }/>
      <CardActions>
        <Button endIcon={ <DeleteIcon/> }></Button>
      </CardActions>
    </Card>
  )
}
