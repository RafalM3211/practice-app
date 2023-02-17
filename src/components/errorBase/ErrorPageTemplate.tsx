import Box from '@mui/material/Box';
import AppBar from '../appBar/AppBar';
import type {FC, ReactNode} from 'react';

interface Props{
  children: ReactNode,
  unauthorized: boolean
}

const ErrorBase: FC<Props> = ({ children, unauthorized }) => {
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'scretch',
          flexDirection: 'column',
        }}
      >
        {unauthorized ? null : <AppBar menuIconHidden />}
        <Box
          height="100%"
          display="flex"
          sx={{
            mx: 'auto',
            mb: 10,
          }}
          flexDirection="column"
          justifyContent="center"
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default ErrorBase;
