import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import type { FC, ReactNode } from 'react';

const theme = createTheme({});

interface Props {
  children: ReactNode
}

const AppTheme: FC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppTheme;
