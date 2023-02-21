import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDrawerContext } from '../../context/drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuLink from '../link/MenuLink';

const drawerWidth = 240;

const NavigationDrawer = () => {
  const { isOpen, toggleOpenDrawer } = useDrawerContext();
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Drawer
      variant={matchesMobile ? 'temporary' : 'permanent'}
      open={isOpen}
      PaperProps={{
        elevation: 4,
      }}
      onClose={toggleOpenDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <MenuLink path="/" text="Lista postów" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <MenuLink path="/add" text="Dodaj post" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
