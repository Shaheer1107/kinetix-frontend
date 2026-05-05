"use client"

// React imports for creating context and managing state
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { authApi } from "@/lib/api/auth"
import { User } from "@/types"

// ─── Define what the context holds ───────────────────────────────────────────
// This is the "shape" of the data available to every component
type AuthContextType = {
  user: User | null          // The logged-in user, or null if not logged in
  token: string | null       // The JWT token
  isLoading: boolean         // True while we're checking if user is logged in
  isAuthenticated: boolean   // Shortcut — true if user exists
  login: (token: string, user: User) => void   // Call this after successful login
  logout: () => void         // Call this to log out
  updateUser: (user: User) => void             // Call this after profile update
}

// ─── Create the context ───────────────────────────────────────────────────────
// This is just creating an empty container — we fill it below
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ─── AuthProvider ─────────────────────────────────────────────────────────────
// This component wraps your entire app and provides auth data to everything inside it
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // Start true — we check localStorage first
  const router = useRouter()

  // ─── On app load, check if user was already logged in ──────────────────────
  // When the page refreshes, useState resets to null
  // So we save the token in localStorage and restore it here
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if (savedToken && savedUser) {
          // Restore from localStorage immediately so UI doesn't flash
          setToken(savedToken)
          setUser(JSON.parse(savedUser))

          // Then verify the token is still valid by calling /api/auth/me
          // This catches expired tokens
          const res = await authApi.getMe()
if (res.success) {
  setUser(res.user)
  localStorage.setItem("user", JSON.stringify(res.user))
}
        }
      } catch {
        // Token is invalid or expired — clear everything
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
      } finally {
        // Either way, we're done loading
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  // ─── Login function ────────────────────────────────────────────────────────
  // Called right after a successful login API response
  const login = (newToken: string, newUser: User) => {
    // Save to state (for the app to use)
    setToken(newToken)
    setUser(newUser)
    // Save to localStorage (survives page refresh)
    localStorage.setItem("token", newToken)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  // ─── Logout function ───────────────────────────────────────────────────────
  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // Even if the API call fails, we still log out on the frontend
    } finally {
      setToken(null)
      setUser(null)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/login")
    }
  }

  // ─── Update user ───────────────────────────────────────────────────────────
  // Called after profile update so the navbar reflects changes immediately
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user, // !! converts user to true/false
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ─── useAuth hook ─────────────────────────────────────────────────────────────
// This is how any component accesses the auth context
// Instead of writing useContext(AuthContext) every time, just write useAuth()
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return context
}