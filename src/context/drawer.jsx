import React, { useState } from 'react';

export const DrawerContext = React.createContext(undefined);

const DrawerProvider = ({ children }) => {
  const [isOpen, setDrawer] = useState(false);
  const toggleOpenDrawer = () => {
    setDrawer(!isOpen);
  };

  return <DrawerContext.Provider value={{ isOpen, toggleOpenDrawer }}>{children}</DrawerContext.Provider>;
};

export default DrawerProvider;
