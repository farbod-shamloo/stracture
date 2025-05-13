import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  avatarBase64: string,
  nationalCode: number,
  twoFactorEnabled: boolean,
  type: boolean
  // هر چیزی که از API میاد اینجا تعریف کن
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://gw.tehrantc.com/ssotest/api/v1/User/GetCurrentUser", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => {
        setUser(data.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
