const baseUrl = "/api/users"

const apiUserRoutes = {
  login: `${baseUrl}/login`,

  register: `${baseUrl}`,

  getUserByUsername: (username: string) => `${baseUrl}/username/${username}`,

  getUserById: (userId: string) => `${baseUrl}/${userId}`,

  getUserPostsByUsername: (username: string, offset: number, limit: number) =>
    `${baseUrl}/username/${username}/posts?offset=${offset}&limit=${limit}`,

  deleteUser: (userId: string) => `${baseUrl}/${userId}`,

  deleteFriend: (userId: string, friendId: string) =>
    `${baseUrl}/${userId}/friends/${friendId}`,

  getUserFriends: (userId: string) => `${baseUrl}/${userId}/friends`,

  getUserConnections: (userId: string) => `${baseUrl}/${userId}/connections`,
}

export default apiUserRoutes
