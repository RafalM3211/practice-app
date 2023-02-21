import React, { useContext, useState } from 'react';
import type {FC, ReactNode} from 'react'

export const DrawerContext = React.createContext<DrawerContextType | null>(null);
export const useDrawerContext = () => {
  const contextValue=useContext(DrawerContext);
  if(!contextValue){
    throw new Error("Dont use drawer context outside provider");
  }
  return contextValue
}

interface Props{
  children: ReactNode
}

interface DrawerContextType{
  isOpen: boolean,
  toggleOpenDrawer(): void
} 

const DrawerProvider: FC<Props> = ({ children }) => {
  const [isOpen, setDrawer] = useState(false);
  const toggleOpenDrawer = () => {
    setDrawer(!isOpen);
  };

  return <DrawerContext.Provider value={{ isOpen, toggleOpenDrawer }}>{children}</DrawerContext.Provider>;
};

export default DrawerProvider;
