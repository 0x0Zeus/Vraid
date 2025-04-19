'use client'

import { AuthContextType, User } from "@/lib/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [logined, setLogined] = useState<boolean>(true)

  return (
    <AuthContext.Provider value={{ logined }}>
      {children}
    </AuthContext.Provider>
  )
} 

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}