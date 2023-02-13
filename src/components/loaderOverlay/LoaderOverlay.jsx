import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const LoaderOverlay = ({ text, loading }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2000,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        display: `${loading ? 'flex' : 'none'}`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
        <CircularProgress size={90} />
        <Typography sx={{ color: 'grey.800' }} mt={2} variant="body1" component="p">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoaderOverlay;
