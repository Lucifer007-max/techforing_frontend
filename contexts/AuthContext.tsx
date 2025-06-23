"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getToken, setToken, removeToken } from "@/utils/auth"
import { signIn, signUp } from "@/utils/api"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      // In a real app, you'd validate the token with your backend
      // For now, we'll decode the user info from localStorage
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await signIn(email, password)
    
    setToken(response.token)
    setUser(response.user)
    localStorage.setItem("user", JSON.stringify(response.user))
  }

  const register = async (name: string, email: string, password: string) => {
    const response = await signUp(name, email, password)
    setToken(response.token)
    setUser(response.user)
    localStorage.setItem("user", JSON.stringify(response.user))
  }

  const logout = () => {
    removeToken()
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
