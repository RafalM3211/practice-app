import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FormattedMessage } from 'react-intl';
import type {FC} from 'react'

interface Props{
  isOpen: boolean,
  close(): void,
  message: string,
}

const ErrorSnackbar: FC<Props> = (props) => {
  return (
    <Snackbar open={props.isOpen} autoHideDuration={3000} onClose={props.close}>
      <Alert severity="error">
        <FormattedMessage id={props.message} />
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
