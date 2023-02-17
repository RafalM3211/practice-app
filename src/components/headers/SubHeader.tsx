import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface Props{
  children: string
}

const SubHeader: FC<Props> = (props) => {
  return (
    <Typography variant="h5" component="h3" {...props}>
      {props.children}
    </Typography>
  );
};

export default SubHeader;
