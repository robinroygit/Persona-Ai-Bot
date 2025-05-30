import React, { createContext, useContext, useState, } from 'react';



// Create the context
const ApiContext = createContext();

// Create the provider component
export const ApiProvider = ({ children }) => {

    const [showMenu,setShowMenu] = useState(false)
    const [loading,setLoading] = useState(false)


const value = {
    showMenu,setShowMenu,
    loading,setLoading
}

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use API context
export const useApi = () => {
  return useContext(ApiContext);
};
