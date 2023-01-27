import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonLink from '../../components/link/ButtonLink';

const calcHeightWithBreakpoints = (theme) => {
  const smToolbarHeight = theme.mixins.toolbar['@media (min-width:600px)'].minHeight;
  const xsToolbarHeight = theme.mixins.toolbar.minHeight;
  return { xs: calcForToolbarHeight(xsToolbarHeight), sm: calcForToolbarHeight(smToolbarHeight) };
};

const calcForToolbarHeight = (toolbarHeight) => {
  return `calc(100vh - ${toolbarHeight}px)`;
};

const NotFound = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
        height: calcHeightWithBreakpoints,
      }}
      maxWidth={'sm'}
    >
      <Box>
        <Typography variant="h2" component="h2">
          Błąd 404
        </Typography>
        <Typography sx={{ fontSize: '1.4em' }} variant="body" component="p">
          podana strona nie istnieje
        </Typography>
        <ButtonLink
          to="/"
          sx={{
            mt: 3,
            textTransform: 'unset',
          }}
          variant="outlined"
        >
          Powrót do strony głównej
        </ButtonLink>
      </Box>
    </Container>
  );
};

export default NotFound;
