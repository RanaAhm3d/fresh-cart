"use client";

import { getUserInfo } from "@/services/user.service";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

const UserContext = createContext({
  user: null as User | null,
  setUser: (user: User | null) => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await getUserInfo();

        if (data?._id) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
