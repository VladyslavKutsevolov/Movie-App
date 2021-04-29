import React, { useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { Button, Snackbar } from '@material-ui/core';

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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (message === '') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
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
