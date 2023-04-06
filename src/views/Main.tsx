import SnackbarProvider from '../context/snackbar';
import UserProvider from '../context/user';
import Box from '@mui/material/Box';
import { Routes, Route } from 'react-router-dom';
import HeaderAppBar from '../components/appBar/AppBar';
import NavigationDrawer from '../components/NavigationDrawer/NavigationDrawer';
import PostsList from './List/List';
import AddPost from './Add/Add';
import Edit from './Edit/Edit';
import NotFound from './Errors/NotFound';

const Main = () => {
  return (
    <SnackbarProvider>
      <UserProvider>
        <div className="App">
          <HeaderAppBar />
          <NavigationDrawer />
          <Box ml={{ lg: 30 }} component="main">
            <Routes>
              <Route path="/" element={<PostsList />} />
              <Route path="/add" element={<AddPost />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Box>
        </div>
      </UserProvider>
    </SnackbarProvider>
  );
};

export default Main;
