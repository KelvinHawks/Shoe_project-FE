import { createContext } from "react";

export const AdminContext = createContext({
  isLoggedIn: false,
  token: null,
  login: () => {},
  logout: () => {},
});
