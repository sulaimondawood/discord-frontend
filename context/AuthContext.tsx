"use client";
import { useState, createContext } from "react";

export const AuthContext = createContext<{ auth: any; setAuth: any }>({
  auth: "",
  setAuth: "",
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
