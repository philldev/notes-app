"use client";

import React from "react";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  id: string;
}

interface AuthProviderCtx {
  user: User;
}

const authContext = React.createContext<AuthProviderCtx | null>(null);

export const AuthProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AuthProviderCtx["user"];
}) => {
  return (
    <authContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export function useCurrentUser() {
  const ctx = React.useContext(authContext);

  if (!ctx) throw new Error("Context not found!");

  return ctx;
}
