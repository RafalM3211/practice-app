import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbarContext } from '../../context/snackbar';
import ViewHeader from '../../components/headers/MainHeader';
import FormSection from '../../components/formSection/FormSection';
import LoaderOverlay from '../../components/loaderOverlay/LoaderOverlay';
import ButtonLink from '../../components/link/ButtonLink';
import SubHeader from '../../components/headers/SubHeader';
import { getSinglePostRequest, sendPutRequest } from '../../core/services/posts';
import type { BadRequestError } from '../../core/clients/types';

const Edit = () => {
  const { id } = useParams();
  if(!id) throw new Error("Post id not specified in url");
  const intl = useIntl();
  const navigate = useNavigate();
  const { successNotification, errorNotification } = useSnackbarContext();

  const { isLoading: isLoadingSinglePost, data: post } = useQuery([id, 'singlePost'], getSinglePostRequest);
  const {
    mutate,
    isLoading: isLoadingSavingPost,
    reset,
  } = useMutation(sendPutRequest, {
    onSuccess: () => {
      reset();
      navigate('/');
      successNotification('Post został zaktualizowany');
    },
    onError: (error: BadRequestError&{wrongField: keyof typeof formik.errors}) => {
      const { errorMessage, wrongField } = error;
      const formattedErrorMessage = intl.formatMessage({ id: errorMessage });
      formik.setErrors({ [wrongField]: formattedErrorMessage });
      errorNotification(errorMessage);
    },
  });

  const formik = useFormik({
    initialValues: {
      title: post?.title || '',
      content: post?.content || '',
      email: post?.email || '',
      zipCode: post?.zipCode || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('nieprawidłowy adres').required('pole jest wymagane'),
      title: Yup.string().max(40, 'maksymalna liczba znaków: 40').required('pole jest wymagane'),
      zipCode: Yup.string().matches(/^[0-9]{2}-[0-9]{3}$/, 'nieprawidłowy format'),
    }),
    onSubmit: (values) => {
      mutate({ id: parseInt(id) , ...values });
    },
    enableReinitialize: true,
  });

  const checkIfDisableSave = () => {
    const areErrors = !!Object.keys(formik.errors).length;
    return !(!areErrors && !isLoadingSinglePost);
  };

  return (
    <Container>
      <ViewHeader>Edytuj post</ViewHeader>
      <form onSubmit={formik.handleSubmit}>
        <SubHeader>Post</SubHeader>
        <FormSection>
          <Grid item xs={12} md={4}>
            {isLoadingSinglePost ? (
              <Skeleton role="skeletonLodaer" variant="rounded" width="100%">
                <TextField />
              </Skeleton>
            ) : (
              <TextField
                id="title"
                name="title"
                label="tytuł posta*"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                error={!!formik.errors.title && formik.touched.title}
                helperText={formik.errors.title && formik.touched.title ? formik.errors.title : null}
                FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
                fullWidth
              />
            )}
          </Grid>
          <Grid item xs={8}>
            {isLoadingSinglePost ? (
              <Skeleton role="skeletonLodaer" variant="rounded" width="100%">
                <TextField multiline minRows={4} />
              </Skeleton>
            ) : (
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
            )}
          </Grid>
        </FormSection>
        <SubHeader>Dane kontaktowe</SubHeader>
        <FormSection>
          <Grid item xs={12} md={4}>
            {isLoadingSinglePost ? (
              <Skeleton role="skeletonLodaer" variant="rounded" width="100%">
                <TextField />
              </Skeleton>
            ) : (
              <TextField
                id="email"
                name="email"
                label="adres poczty e-mail*"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={!!formik.errors.email && formik.touched.email}
                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                FormHelperTextProps={{ sx: { height: 0, mt: 0 } }}
                fullWidth
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            {isLoadingSinglePost ? (
              <Skeleton role="skeletonLodaer" variant="rounded" width="100%">
                <TextField />
              </Skeleton>
            ) : (
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
            )}
          </Grid>
        </FormSection>
        <Box sx={{ mt: 5, display: 'flex' }}>
          <Button disabled={checkIfDisableSave()} type="submit" variant="contained">
            zapisz
          </Button>
          <ButtonLink to="/" sx={{ ml: 0.5 }} variant="text">
            zamknij
          </ButtonLink>
        </Box>
      </form>
      <LoaderOverlay loading={isLoadingSavingPost} text={'zapisywanie...'} />
    </Container>
  );
};

export default Edit;
