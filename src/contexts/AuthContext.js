import { createContext } from "react";

const AuthContext = createContext({
  authenticatedUser: null,
  setAuthenticatedUser: (auth) => {}
});

export default AuthContext;
