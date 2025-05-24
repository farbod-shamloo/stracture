import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/axios";

interface User {
  firstName: string;
  lastName: string;
  userName: string;
  avatarBase64: string;
  nationalCode: number;
  twoFactorEnabled: boolean;
  type: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/v1/User/GetCurrentUser", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
