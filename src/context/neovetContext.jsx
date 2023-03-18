import { createContext, useState } from 'react';

export const NeovetContext = createContext();

const NeovetContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const initialValue = JSON.parse(savedUser);
    return initialValue || null;
  });

  const [jwt, setJwt] = useState(() => {
    const savedJwt = localStorage.getItem('token');
    return savedJwt || null;
  });

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const login = (resUser, resToken) => {
    setUser(resUser);
    setJwt(resToken);
    localStorage.setItem('token', resToken);
    localStorage.setItem('user', JSON.stringify(resUser));
    console.log(resUser);
  };

  return (
    <NeovetContext.Provider value={{ user, setUser, jwt, logout, login, setJwt }}>
      {children}
    </NeovetContext.Provider>
  );
};

export default NeovetContextProvider;
