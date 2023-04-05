import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import type { FC } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

interface Props{
  children: ReactNode,
  to: string,
  variant: 'contained' | 'outlined'| 'text',
  sx?: SxProps<Theme>,
  [rest: string]: any
}

const ButtonLink: FC<Props> = ({ children, to: path, variant, ...props }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={path}>
      <Button {...props} variant={variant}>
        {children}
      </Button>
    </Link>
  );
};

export default ButtonLink;
