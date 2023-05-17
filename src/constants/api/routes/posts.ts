const baseUrl = "/api/posts"

const apiPostRoutes = {
  create: (userId: string) => `${baseUrl}/create?userId=${userId}`,

  update: (postId: string, userId: string) =>
    `${baseUrl}/update?postId=${postId}&userId=${userId}`,

  delete: (postId: string, userId: string) =>
    `${baseUrl}/delete?postId=${postId}&userId=${userId}`,

  like: (postId: string, userId: string) =>
    `${baseUrl}/like?postId=${postId}&userId=${userId}`,

  get: (postId: string) => `/api/posts/${postId}`,

  getRecentPosts: (offset: number, limit: number) =>
    `${baseUrl}/recent?offset=${offset}&limit=${limit}`,
}

export default apiPostRoutes
