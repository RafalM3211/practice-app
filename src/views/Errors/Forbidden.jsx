import ErrorBase from '../../components/errorBase/ErrorPageTemplate';
import AccessDeniedImg from '../../images/errors/AccessDeniedImg';
import Typography from '@mui/material/Typography';

const InternalServerError = () => {
  return (
    <ErrorBase unauthorized>
      <AccessDeniedImg width={350} />
      <Typography sx={{ textAlign: 'center', mt: 3 }} variant="body" component="p">
        Odmowa dostępu
      </Typography>
    </ErrorBase>
  );
};

export default InternalServerError;
