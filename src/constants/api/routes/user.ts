const baseUrl = "/api/users"

const apiUserRoutes = {
  login: `${baseUrl}/login`,

  register: `${baseUrl}/register`,

  getUserByUsername: (username: string) => `${baseUrl}/${username}`,

  getUserById: (userId: string) => `${baseUrl}/${userId}`,

  getUserPostsByUsername: (username: string, offset: number, limit: number) =>
    `${baseUrl}/${username}/posts?offset=${offset}&limit=${limit}`,
}

export default apiUserRoutes
