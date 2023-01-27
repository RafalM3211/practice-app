import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const ButtonLink = ({ children, to: path, variant, ...props }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={path}>
      <Button {...props} variant={variant}>
        {children}
      </Button>
    </Link>
  );
};

export default ButtonLink;
