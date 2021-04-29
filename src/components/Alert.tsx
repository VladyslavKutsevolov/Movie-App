import React, { useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Snackbar } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    top: '.3rem',
    marginBottom: '1rem'
  },
  snackBarPosition: {
    width: '10rem'
  }
});

interface Props {
  message: string;
  type: string;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertComponent = (props: Props) => {
  const { message, type } = props;
  const [open, setOpen] = useState<boolean>(!!message || false);
  const classes = useStyles();

  const handleClose = () => {
    if (message === '') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        className={classes.root}
      >
        <Alert
          onClose={handleClose}
          severity={type === 'info' ? 'info' : 'error'}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AlertComponent;
