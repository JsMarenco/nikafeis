const baseUrl = "/api/users"

const apiUserRoutes = {
  login: `${baseUrl}/login`,

  register: `${baseUrl}/register`,

  getUserByUsername: (username: string) => `${baseUrl}/${username}`,

  getUserById: (userId: string) => `${baseUrl}/${userId}`,
}

export default apiUserRoutes
