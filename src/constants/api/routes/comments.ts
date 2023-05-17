const baseUrl = "/api/comments"

const apiCommentsRoutes = {
  create: `${baseUrl}`,

  update: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}?userId=${userId}`,

  like: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}/like?userId=${userId}`,

  delete: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}?userId=${userId}`,

  getById: (commentId: string) => `${baseUrl}/${commentId}`,

  getComments: (offset: number, limit: number) =>
    `${baseUrl}/list?offset=${offset}&limit=${limit}`,
}

export default apiCommentsRoutes
