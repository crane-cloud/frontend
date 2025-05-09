import { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextType {
  authToken: string | null;
  logout: () => void;
  login: (token: string) => void;
  user: any;
  loggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [loggedIn, setLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token"),
  );

  const [user, setUser] = useState<any>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null,
  );

  const login = (data: any) => {
    localStorage.setItem("token", data?.data?.access_token);
    localStorage.setItem("user", JSON.stringify(data?.data));
    setAuthToken(data?.data?.access_token);
    setUser(data?.data);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, user, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
