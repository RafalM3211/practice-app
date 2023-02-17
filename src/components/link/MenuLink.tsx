import { Link } from 'react-router-dom';
import ListItemText from '@mui/material/ListItemText';
import type { FC } from 'react';

interface Props{
  path: string,
  text: string
}

const MenuLink: FC<Props> = ({ path, text }) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'unset' }} to={path}>
      <ListItemText primary={text} />
    </Link>
  );
};

export default MenuLink;
