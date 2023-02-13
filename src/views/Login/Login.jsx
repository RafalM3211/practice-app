import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { useUserContext } from '../../context/user';
import { sendLoginRequest } from '../../core/services/user';
import { useEffect } from 'react';

const Login = () => {
  const intl = useIntl();
  const { updateUser } = useUserContext();

  useEffect(() => {
    console.log('login: Jan Kowalski, password: Librus12,');
  }, []);

  const { mutate, isLoading } = useMutation(sendLoginRequest, {
    onSuccess: async (response) => {
      const { token } = await response.json();
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userName', formik.values.login);
      updateUser({ isLoggedIn: true, name: formik.values.login });
    },
    onError: (error) => {
      const { errorMessage } = error;
      const formattedErrorMessage = intl.formatMessage({ id: errorMessage });
      formik.setErrors({ login: formattedErrorMessage, password: formattedErrorMessage });
    },
  });

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().required('pole jest wymagane'),
      password: Yup.string().required('pole jest wymagane'),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Box
      sx={{
        width: '100vw',
        backgroundColor: 'grey.50',
      }}
    >
      <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper sx={{ width: '100%' }}>
          <Box sx={{ backgroundColor: 'primary.main', borderTopLeftRadius: 4, borderTopRightRadius: 4 }}>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                color: 'common.white',
                px: 2,
                py: 1,
              }}
            >
              App
            </Typography>
          </Box>
          <Typography variant="h6" component="h2" sx={{ textAlign: 'center', mt: 3, mb: 1 }}>
            Zaloguj się do aplikacji
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Stack
              sx={{
                px: 3,
              }}
            >
              <TextField
                sx={{ my: 2 }}
                label="Nazwa użytkownika"
                id="login"
                type="text"
                {...formik.getFieldProps('login')}
                error={!!formik.errors.login && formik.touched.login}
                helperText={formik.errors.login && formik.touched.login ? formik.errors.login : null}
                FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
              />
              <TextField
                sx={{ mt: 2, mb: 1 }}
                label="Hasło"
                id="password"
                type="password"
                {...formik.getFieldProps('password')}
                error={!!formik.errors.password && formik.touched.password}
                helperText={formik.errors.password && formik.touched.password ? formik.errors.password : null}
                FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
              />
              <LoadingButton
                disabled={!!Object.keys(formik.errors).length}
                loading={isLoading}
                sx={{
                  mx: 18,
                  my: 3,
                }}
                variant="contained"
                type="submit"
              >
                zaloguj
              </LoadingButton>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
