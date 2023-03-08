import React, { useCallback, useEffect, useState } from 'react';
import Login from '../views/Login/Login';
import LoaderOverlay from '../components/loaderOverlay/LoaderOverlay';
import { useContext } from 'react';
import type { ReactNode, FC } from 'react'

const UserContext = React.createContext<UserContextType | undefined>(undefined);
export const useUserContext = () => {
  const contextValue=useContext(UserContext);
  if(!contextValue){
    throw new Error("Dont use user context outside provider");
  }
  return contextValue;
};

interface UserType {
  isLoggedIn: boolean,
  name: string,
  logOut(): void
}

interface UserContextType {
  user: UserType,
  updateUser(newData: Partial<UserType>): void
}

interface Props {
  children: ReactNode
}

type Token = string | null

const UserProvider: FC<Props> = ({ children }) => {
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
  
  const updateUser = useCallback((newData: Partial<UserType>) => {
    setUser(currentUser=>({ ...currentUser, ...newData }));
  }, [setUser]);

  useEffect(() => {
    const checkToken = async (token: Token) => {
      console.log('token', token);
      return !!token;
    };

    const token = sessionStorage.getItem('token');
    const userName = sessionStorage.getItem('userName');
    checkToken(token).then((isValid) => {
      setIsTokenLoading(false);
      if (isValid) updateUser({ name: userName as string, isLoggedIn: true });
      else updateUser({ name: '', isLoggedIn: false });
    });
  }, [updateUser]);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {isTokenLoading ? <LoaderOverlay loading text="sprawdzanie tokenu..." /> : user.isLoggedIn ? children : <Login />}
    </UserContext.Provider>
  );
};

export default UserProvider;
