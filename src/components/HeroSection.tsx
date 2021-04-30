import React from 'react';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import LoginButton from './auth/LoginButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      position: 'absolute',
      width: '100%',
      left: '50%',
      top: '50%',
      height: '100%',
      objectFit: 'cover',
      transform: 'translate(-50%, -50%)',
      zIndex: -1
    },
    intro: {
      color: '#fff',
      textAlign: 'center'
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '15rem',
      [theme.breakpoints.down('xs')]: {
        marginTop: '10rem'
      }
    },
    button: {
      marginTop: '2rem'
    }
  })
);

const HeroSection = () => {
  const classes = useStyles();
  const videoPath =
    'https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/SScGOMwcgizu1231h/videoblocks-animated-video-wall-rotating-loop-able-4k_sgonrvo9e__42ac9ced394b044a03c122382a248cac__P360.mp4';
  return (
    <div className={classes.wrapper}>
      <video className={classes.video} autoPlay loop muted>
        <source src={videoPath} type="video/mp4" />
      </video>
      <div className={classes.intro}>
        <Typography variant="h2" component="h1">
          Welcome to MOOVIX
        </Typography>
        <Typography variant="h4" component="p">
          Place where you can browse your favorite movies
        </Typography>
        <div className={classes.button}>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
