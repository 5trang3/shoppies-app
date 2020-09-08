import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const cardStyles = makeStyles(theme => ({
  root: {
    flexBasis: '240px',
    margin: '0 5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexBasis: 'auto',
      margin: '5px 0'
    }
  }}))
const cardMediaStyles = makeStyles(theme => ({
  root: {
    height: '0px',
    paddingTop: '150%',
  }}))

export default (props) => {

  const cardClasses = cardStyles();
  const cardMediaClasses = cardMediaStyles();

  const theme = useTheme();
  const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down('sm'))

  const renderButtonIcon = (<Tooltip title='Remove from Nominations'>
                              <IconButton onClick={ () => props.removeMovie(props.id)}>
                                <DeleteIcon fontSize='small'/>
                              </IconButton>
                            </Tooltip>)
  const renderImage = isSmallBreakpoint ? null : <CardMedia image={ props.nominatedMovie.image } className={ cardMediaClasses.root }/>

  return (
    <Card className={ cardClasses.root }>
        <CardHeader title={ props.nominatedMovie.title } subheader={ props.nominatedMovie.year } titleTypographyProps={ { variant: 'subtitle2' } } action={ renderButtonIcon }/>
      { renderImage }
    </Card>
  )
}
