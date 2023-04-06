import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonLink from '../../components/link/ButtonLink';
import type { Theme } from '@mui/material/styles';

const calcHeightWithBreakpoints = (theme: Theme) => {
  const smToolbarHeight = theme.mixins.toolbar['@media (min-width:600px)'] as number;
  const xsToolbarHeight = theme.mixins.toolbar.minHeight;
  if(xsToolbarHeight===undefined) throw new Error("min height set to undefinded");
  return { xs: calcForToolbarHeight(xsToolbarHeight), sm: calcForToolbarHeight(smToolbarHeight) };
};

const calcForToolbarHeight = (toolbarHeight: number|string) => {
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
        <Typography sx={{ fontSize: '1.4em' }} variant="body1" component="p">
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
