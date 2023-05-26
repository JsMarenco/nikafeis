const appRoutes = {
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
  },
  settings: {
    general: "/settings",
    profile: "/settings/profile",
    account: "/settings/account",
    privacy: "/settings/privacy",
  },
  home: "/home",
  notFound: "/404",
  profile: {
    view: (username: string) => `/p/${username}`,
  },
}

export default appRoutes
