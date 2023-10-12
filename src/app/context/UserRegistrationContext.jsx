import { createContext, useContext, useState } from 'react';

// Create a context
const UserRegistrationContext = createContext();

// Create a provider to manage the user registration state
export const UserRegistrationProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  return (
    <UserRegistrationContext.Provider value={{ isRegistered, setIsRegistered }}>
      {children}
    </UserRegistrationContext.Provider>
  );
};

// Create a custom hook to access the context
export const useUserRegistration = () => {
  return useContext(UserRegistrationContext);
};
