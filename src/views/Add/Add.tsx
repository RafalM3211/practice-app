import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import ViewHeader from '../../components/headers/MainHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SubHeader from '../../components/headers/SubHeader';
import FormSection from '../../components/formSection/FormSection';
import * as Yup from 'yup';
import { useMutation } from 'react-query';
import { putPostRequest } from '../../core/services/posts';
import ButtonLink from '../../components/link/ButtonLink';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from '../../context/snackbar';
import LoaderOverlay from '../../components/loaderOverlay/LoaderOverlay';
import { useIntl } from 'react-intl';
import type { BadRequestError } from '../../core/clients/types';

const AddPost = () => {
  const { mutate, isLoading } = useMutation(putPostRequest, {
    onSuccess: () => {
      navigate('/');
      successNotification('Dodano pomyślnie');
    },
    onError: (error: BadRequestError&{wrongField: keyof typeof formik.errors}) => {
      const { errorMessage, wrongField } = error;
      formik.errors[wrongField] = intl.formatMessage({ id: errorMessage });
      errorNotification(errorMessage);
    },
  });
  const intl = useIntl();
  const navigate = useNavigate();
  const { successNotification, errorNotification } = useSnackbarContext();

  const formik = useFormik({
    initialValues: {
      email: '',
      zipCode: '',
      title: '',
      content: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('nieprawidłowy adres').required('pole jest wymagane'),
      title: Yup.string().max(40, 'maksymalna liczba znaków: 40').required('pole jest wymagane'),
      zipCode: Yup.string().matches(/^[0-9]{2}-[0-9]{3}$/, 'nieprawidłowy format'),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Container>
      <ViewHeader>Dodaj post</ViewHeader>
      <form onSubmit={formik.handleSubmit}>
        <SubHeader>Post</SubHeader>
        <FormSection>
          <Grid item xs={12} md={4}>
            <TextField
              id="title"
              name="title"
              label="tytuł posta"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={!!formik.errors.title && formik.touched.title}
              helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null}
              FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
              fullWidth
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              multiline
              id="content"
              name="content"
              label="treść posta"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.content}
              fullWidth
              minRows={4}
              maxRows={20}
            />
          </Grid>
        </FormSection>
        <SubHeader>Dane kontaktowe</SubHeader>
        <FormSection>
          <Grid item xs={12} md={4}>
            <TextField
              id="email"
              name="email"
              label="adres poczty e-mail"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={!!formik.errors.email && formik.touched.email}
              helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
              FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              id="zipCode"
              name="zipCode"
              label="kod pocztowy"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipCode}
              error={!!formik.errors.zipCode && formik.touched.zipCode}
              helperText={formik.errors.zipCode && formik.touched.zipCode ? formik.errors.zipCode : null}
              FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
              fullWidth
              inputProps={{
                maxLength: 6,
              }}
            />
          </Grid>
        </FormSection>
        <Box sx={{ mt: 5, display: 'flex' }}>
          <Button disabled={!!Object.keys(formik.errors).length} type="submit" variant="contained">
            dodaj
          </Button>
          <ButtonLink to="/" sx={{ ml: 0.5 }} variant="text">
            zamknij
          </ButtonLink>
        </Box>
      </form>
      <LoaderOverlay loading={isLoading} text={'dodawanie...'} />
    </Container>
  );
};

export default AddPost;
