import ErrorSnackbar from '../components/snackbar/ErrorSnackbar';
import React, { useState } from 'react';
import SuccessSnackbar from '../components/snackbar/SuccessSnackbar';

export const SnackbarContext = React.createContext(undefined);

const SnackbarProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessOpen, setSucessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorOpen, setErrorOpen] = useState(false);

  const appearSuccessSnackbar = (message) => {
    setSuccessMessage(message);
    setSucessOpen(true);
  };

  const appearErrorSnackbar = (message) => {
    setErrorMessage(message);
    setErrorOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{ successNotification: appearSuccessSnackbar, errorNotification: appearErrorSnackbar }}
    >
      {children}
      <SuccessSnackbar
        isOpen={isSuccessOpen}
        close={() => {
          setSucessOpen(false);
        }}
        message={successMessage}
      ></SuccessSnackbar>
      <ErrorSnackbar
        isOpen={isErrorOpen}
        close={() => {
          setErrorOpen(false);
        }}
        message={errorMessage}
      ></ErrorSnackbar>
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
