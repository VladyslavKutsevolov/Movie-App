import React from 'react';
import {
  AppBar,
  Button,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core';
import TheatersIcon from '@material-ui/icons/Theaters';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#6D5959'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <TheatersIcon />
        <Typography className={classes.title} variant="h5">
          MOOVIX
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
