import React from 'react';

// Define a default user object
export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// Define a default logOut function
export const defaultLogOut = () => {
  console.log("Logging out...");
};

// Create a React context with the default user and logOut function
const AppContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default AppContext;
