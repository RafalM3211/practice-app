import React, { useEffect, useState } from 'react';
import Login from '../views/Login/Login';
import LoaderOverlay from '../components/loaderOverlay/LoaderOverlay';
import { useContext } from 'react';

const UserContext = React.createContext(undefined);
export const useUserContext = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const initialUserState = {
    isLoggedIn: false,
    name: '',
    logOut: () => {
      sessionStorage.clear();
      updateUser({ isLoggedIn: false, name: '' });
    },
  };
  const [isTokenLoading, setIsTokenLoading] = useState(true);

  const [user, setUser] = useState(initialUserState);

  useEffect(() => {
    const checkToken = async (token) => {
      console.log('token', token);
      return !!token;
    };

    const token = sessionStorage.getItem('token');
    const userName = sessionStorage.getItem('userName');
    checkToken(token).then((isValid) => {
      setIsTokenLoading(false);
      if (isValid) updateUser({ name: userName, isLoggedIn: true });
      else updateUser({ name: '', isLoggedIn: false });
    });
  }, []);

  const updateUser = (newData) => {
    setUser({ ...user, ...newData });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {isTokenLoading ? <LoaderOverlay loading text="sprawdzanie tokenu..." /> : user.isLoggedIn ? children : <Login />}
    </UserContext.Provider>
  );
};

export default UserProvider;
