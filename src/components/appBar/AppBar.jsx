import * as React from 'react';
import { useContext } from 'react';
import { useState, useRef } from 'react';
import { AppBar as MuiAppBar } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { DrawerContext } from '../../context/drawer';
import { useUserContext } from '../../context/user';

const AppBar = ({ menuIconHidden }) => {
  const { toggleOpenDrawer } = useContext(DrawerContext);
  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const userElement = useRef(null);
  const isMenuOpen = !!anchorEl;

  const handleUserClick = () => {
    setAnchorEl(userElement.current);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <MuiAppBar
        role="banner"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        position="sticky"
      >
        <Toolbar sx={{ pr: '0!important' }}>
          {menuIconHidden ? null : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'inherit', lg: 'none' }, mr: 2 }}
              onClick={toggleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <Box
            id="user-container"
            onClick={handleUserClick}
            sx={{
              backgroundColor: 'primary.dark',
              pl: 1,
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              display: 'flex',
              alignItems: 'center',
              py: 1,
              cursor: 'pointer',
              '&:hover': { backgroundColor: 'rgb(0 0 0 / 15%)' },
            }}
          >
            <AccountCircle sx={{ fontSize: 32 }} />
            <Box sx={{}}>
              <Typography ref={userElement} variant="subtitle1" component="p" sx={{ pl: 1, pr: 4 }}>
                {user.name}
              </Typography>
            </Box>
          </Box>
          <Menu
            autoFocus={false}
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              'aria-labelledby': 'user-container',
            }}
          >
            <MenuItem onClick={user.logOut}>Wyloguj</MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};

export default AppBar;
