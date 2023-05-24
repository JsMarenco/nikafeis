// Third-party dependencies
import { ReactNode } from "react"

// Current project dependencies
import useAuth from "@/hooks/user/useAuth"

export default function Auth({ children }: { children: ReactNode }) {
  useAuth()

  return <>{children}</>
}
