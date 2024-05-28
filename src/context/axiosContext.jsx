import React, { createContext, useContext } from 'react';
import axiosInstance from '../axiosConfig';

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
