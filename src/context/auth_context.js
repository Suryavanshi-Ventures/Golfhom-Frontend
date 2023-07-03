import { createContext, useState } from "react";
export const AuthContext = createContext();
import React from "react";

const AuthProvider = ({ children }) => {
  const [UserState, setUserState] = useState();
  return (
    <AuthContext.Provider value={{ UserState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
