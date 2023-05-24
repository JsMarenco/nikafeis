import { useEffect } from "react"

// Third-party dependencies
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

// Current project dependencies
import appRoutes from "@/constants/app/routes"
import { RootState } from "@/app/store"

/**
 * A custom hook that manages authentication state and redirects users
 * to the login page if they attempt to access a protected route while not logged in.
 */
const useAuth = (): { isLogged: boolean } => {
  const router = useRouter()
  const { auth } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const allowedRoutesIfUserIsNotLogged = [
      appRoutes.auth.register,
      appRoutes.notFound,
      appRoutes.auth.forgotPassword,
      appRoutes.auth.login,
    ]

    const restrictRoutesIfUserIsNotLogged = [
      appRoutes.auth.register,
      appRoutes.auth.forgotPassword,
      appRoutes.auth.login,
    ]

    const isAllowedRoute = allowedRoutesIfUserIsNotLogged.includes(
      router.pathname
    )
    const isRestrictedRoute = restrictRoutesIfUserIsNotLogged.includes(
      router.pathname
    )

    if (!auth.isLogged && !isAllowedRoute) {
      router.push(appRoutes.auth.login) // Redirect to login page if not logged in and accessing a restricted route
    } else if (auth.isLogged && isRestrictedRoute) {
      router.push(appRoutes.home) // Redirect to home page if logged in and accessing a restricted route
    }
  }, [router, auth.isLogged])

  return { isLogged: auth.isLogged }
}

export default useAuth
