const baseUrl = "/api/comments"

const apiCommentsRoutes = {
  create: `${baseUrl}`,
  update: (commentId: string) => `${baseUrl}/${commentId}`,
  like: (commentId: string) => `${baseUrl}/${commentId}/like`,
  delete: (commentId: string) => `${baseUrl}/${commentId}`,
  get: (commentId: string) => `${baseUrl}/${commentId}`,
}

export default apiCommentsRoutes
