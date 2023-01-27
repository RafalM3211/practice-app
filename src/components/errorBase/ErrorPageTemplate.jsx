import Box from '@mui/material/Box';
import AppBar from '../appBar/AppBar';

const ErrorBase = ({ children, unauthorized }) => {
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
