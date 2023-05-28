const baseUrl = "/api/comments"

const apiCommentsRoutes = {
  create: (postId: string, userId: string) =>
    `${baseUrl}/create?postId=${postId}&userId=${userId}`,

  update: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}?userId=${userId}`,

  like: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}/like?userId=${userId}`,

  report: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}/report?userId=${userId}`,

  delete: (commentId: string, userId: string) =>
    `${baseUrl}/${commentId}?userId=${userId}`,

  getById: (commentId: string) => `${baseUrl}/${commentId}`,

  getComments: (postId: string, offset: number, limit: number) =>
    `${baseUrl}/list?postId=${postId}&offset=${offset}&limit=${limit}`,
}

export default apiCommentsRoutes
