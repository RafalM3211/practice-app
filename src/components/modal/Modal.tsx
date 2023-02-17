import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import type {FC} from 'react'

interface Props{
  title: string,
  loading: boolean,
  onConfirm(): void,
  onCancel(): void
}

const Modal: FC<Props> = (props) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2000,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(50, 50, 50, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5" component={'h5'}>
          Usuwanie postu
        </Typography>
        <Typography variant="body1" component={'h5'} sx={{ mt: 0.3, mb: 1 }}>
          Czy jesteś pewien, że chcesz usunąć wybrany post?
        </Typography>
        <Typography variant="body2" component={'h5'} sx={{ fontStyle: 'italic' }}>
          {props.title}
        </Typography>
        <Box sx={{ mt: 3, alignSelf: 'flex-end' }}>
          <LoadingButton
            loading={props.loading}
            onClick={props.onConfirm}
            size="small"
            sx={{ mr: 2 }}
            variant="contained"
          >
            tak
          </LoadingButton>
          <Button onClick={props.onCancel} size="small" variant="text">
            nie
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Modal;
