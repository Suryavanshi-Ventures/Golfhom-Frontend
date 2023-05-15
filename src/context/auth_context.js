import { createContext, useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [UserState, setUserState] = useState();

  return (
    <AuthContext.Provider value={{ UserState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
