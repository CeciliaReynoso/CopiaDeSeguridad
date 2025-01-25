import { createContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const RolesContext = createContext();

export const RolesProvider = ({ children }) => {
  const { user } = useAuth(null);
  const [cargo, setCargo] = useState(null);

  useEffect(() => {
    if (user) {
      setCargo(user.rol);
    } else {
      setCargo(null);
    }
  }, [user]);

  return (
    <RolesContext.Provider value={{ cargo, setCargo }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesContext;