"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface User {
  id: number
  username: string
  email: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: any) => Promise<void>
  register: (data: any) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token")
      if (token) {
        try {
          const response = await apiClient.get("auth/user/")
          setUser(response.data)
        } catch (error) {
          console.error("Failed to fetch user", error)
          logout()
        }
      }
      setLoading(false)
    }
    fetchUser()
  }, [])

  const login = async (credentials: any) => {
    try {
      const response = await apiClient.post("auth/login/", credentials)
      const { access, refresh, user } = response.data
      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)
      setUser(user)
      toast.success("Logged in successfully")
      router.push("/")
    } catch (error: any) {
      toast.error(error.response?.data?.non_field_errors?.[0] || "Login failed")
      throw error
    }
  }

  const register = async (data: any) => {
    try {
      await apiClient.post("auth/registration/", data)
      toast.success("Registered successfully! Please login.")
      router.push("/login")
    } catch (error: any) {
      toast.error("Registration failed. Please check your details.")
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    setUser(null)
    router.push("/login")
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
