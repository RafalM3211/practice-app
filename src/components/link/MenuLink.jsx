import { Link } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';

const MenuLink = ({ path, text }) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'unset' }} to={path}>
      <ListItemText primary={text} />
    </Link>
  );
};

export default MenuLink;
