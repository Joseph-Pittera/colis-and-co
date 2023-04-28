import React, { createContext, useState, useEffect } from "react";

export type UserData = {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
  };
};

type AuthContextType = {
  isLoggedIn: boolean;
  userData: UserData;
  login: (userData: UserData) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userData: {
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      token: "",
    },
  },
  login: () => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: "",
      token: "",
    },
  });

  useEffect(() => {
    const userDataString = localStorage.getItem("colisandcoUserData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUserData(userData);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = (userData: UserData) => {
    localStorage.setItem("colisandcoUserData", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const logout = () => {
    localStorage.removeItem("colisandcoUserData");
    setIsLoggedIn(false);
    setUserData({
      user: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        token: "",
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
