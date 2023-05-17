const baseUrl = "/api/comments"

const apiCommentsRoutes = {
  create: `${baseUrl}`,
  update: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}?userId=${userId}`,
  like: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}/like?userId=${userId}`,
  delete: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}?userId=${userId}`,
  get: (commentId: string) => `${baseUrl}/${commentId}`,
}

export default apiCommentsRoutes
