import ErrorSnackbar from '../components/snackbar/ErrorSnackbar';
import React, { useContext, useState } from 'react';
import SuccessSnackbar from '../components/snackbar/SuccessSnackbar';
import type { FC, ReactNode } from 'react'

const SnackbarContext = React.createContext<SnackbarContextType | null>(null);

export const useSnackbarContext = () =>{
  const context = useContext(SnackbarContext);
  if(!context){
    throw  new Error("Dont use snackbar context outside provider");
  }
  return context
}

interface SnackbarContextType{
  successNotification(message: string): void,
  errorNotification(message: string): void,
}

interface Props{
  children: ReactNode
}

const SnackbarProvider: FC<Props> = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessOpen, setSucessOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorOpen, setErrorOpen] = useState(false);

  const appearSuccessSnackbar = (message: string) => {
    setSuccessMessage(message);
    setSucessOpen(true);
  };

  const appearErrorSnackbar = (message: string) => {
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
