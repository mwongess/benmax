import { createContext, useContext } from "react";

export const AuthContext = createContext<{
  user: any;
  authStatus: boolean;
  clients: any;
  setClients: any
  clientUsage: any;
  setAuthStatus: (status: boolean) => void;
}>({
  user: null,
  authStatus: false,
  clients: [],
  setClients: ()=>{},
  clientUsage: [],
  setAuthStatus: () => {},
});

export const AuthProvider = AuthContext.Provider;

export const useAuth = () => {
  const data = useContext(AuthContext);
  return data;
};
