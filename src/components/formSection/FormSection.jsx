import Grid from '@mui/material/Grid';

const FormSection = (props) => {
  return (
    <Grid mb={3} mt={1} container gap={3}>
      {props.children}
    </Grid>
  );
};

export default FormSection;
