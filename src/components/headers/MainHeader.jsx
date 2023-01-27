import Typography from '@mui/material/Typography';

const ViewHeader = ({ children }) => {
  return (
    <Typography
      sx={{
        my: 3,
      }}
      variant="h4"
      component="h2"
    >
      {children}
    </Typography>
  );
};

export default ViewHeader;
