const baseUrl: string = "/api/friend-requests"

const apiFriendRequestRoutes = {
  send: (senderId: string, receiverId: string): string =>
    `${baseUrl}/send?senderId=${senderId}&receiverId=${receiverId}`,

  reject: (requestId: string, receiverId: string): string =>
    `${baseUrl}/reject?requestId=${requestId}&receiverId=${receiverId}`,

  cancel: (requestId: string, senderId: string): string =>
    `${baseUrl}/cancel?requestId=${requestId}&senderId=${senderId}`,

  accept: (requestId: string, receiverId: string): string =>
    `${baseUrl}?requestId=${requestId}&receiverId=${receiverId}`,

  getFriendRequestsByUserId: (
    userId: string,
    offset: number,
    limit: number
  ): string => `${baseUrl}/user/${userId}?offset=${offset}&limit=${limit}`,
}

export default apiFriendRequestRoutes
