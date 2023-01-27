import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';

const SuccessSnackbar = (props) => {
  return (
    <Snackbar open={props.isOpen} autoHideDuration={3000} message={props.message} onClose={props.close}>
      <Alert severity="success">{props.message}</Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
