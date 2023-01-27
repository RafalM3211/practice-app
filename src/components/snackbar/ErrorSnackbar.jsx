import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const ErrorSnackbar = (props) => {
  return (
    <Snackbar open={props.isOpen} autoHideDuration={3000} onClose={props.close}>
      <Alert severity="error">
        <FormattedMessage id={props.message} />
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
