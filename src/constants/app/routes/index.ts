const appRoutes = {
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    logout: "/logout",
  },
  settings: {
    general: "/settings",
    profile: "/settings/profile",
    account: "/settings/account",
    privacy: "/settings/privacy",
  },
  pages: {
    home: "/home",
    notFound: "/404",
    explore: "/explore",
    inbox: "/inbox",
    groups: "/groups",
    friends: "/friends",
    privacy: "/privacy",
  },
  home: "/home",
  notFound: "/404",
  profile: {
    view: (username: string) => `/p/${username}`,
  },
}

export default appRoutes
