import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type {FC} from 'react'

interface Props{
  isOpen: boolean,
  close(): void,
  message: string,
}

const SuccessSnackbar: FC<Props> = (props) => {
  return (
    <Snackbar open={props.isOpen} autoHideDuration={3000} onClose={props.close}>
      <Alert severity="success">{props.message}</Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
