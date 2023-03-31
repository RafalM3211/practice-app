import ErrorBase from '../../components/errorBase/ErrorPageTemplate';
import ServerDownImg from '../../images/errors/ServerDownImg';
import Typography from '@mui/material/Typography';

const InternalServerError = () => {
  return (
    <ErrorBase unauthorized>
      <ServerDownImg width={350} />
      <Typography sx={{ textAlign: 'center', mt: 3 }} variant="body1" component="p">
        Bład serwera. Przepraszamy
      </Typography>
    </ErrorBase>
  );
};

export default InternalServerError;
