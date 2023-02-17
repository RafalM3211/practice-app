import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

type Props={
  children: ReactNode,
  to: string,
  variant: 'contained' | 'outlined'| 'text'
}

const ButtonLink = ({ children, to: path, variant, ...props }: Props) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={path}>
      <Button {...props} variant={variant}>
        {children}
      </Button>
    </Link>
  );
};

export default ButtonLink;
