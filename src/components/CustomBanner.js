import React from 'react';
import { Banner } from 'material-ui-banner'
import { makeStyles } from '@material-ui/core/styles'

const bannerStyles = makeStyles({
  card: {
    height: '50px',
  },
  paper: {
    marginBottom: '10px'
  }
})

export default (props) => {
  const bannerClasses = bannerStyles();
  return <Banner open={ props.limitReached() } label='You have reached the maximum number of nominations.' showDismissButton={ false } cardProps={{ className: bannerClasses.card }} paperProps={{ className: bannerClasses.paper }}/>
}
