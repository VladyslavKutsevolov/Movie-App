import React from 'react';
import { Typography } from '@material-ui/core';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', color: '#fff', marginTop: '1rem' }}>
      <Typography variant="h2" component="h1">
        404 Page is not found
      </Typography>
    </div>
  );
};

export default NotFoundPage;
