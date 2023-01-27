import Typography from '@mui/material/Typography';

const SubHeader = (props) => {
  return (
    <Typography variant="h5" component="h3" {...props}>
      {props.children}
    </Typography>
  );
};

export default SubHeader;
