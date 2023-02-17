import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const ViewHeader: FC<{children: string}> = ({ children }) => {
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
