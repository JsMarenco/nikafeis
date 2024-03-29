const baseUrl: string = "/api/friend-requests"

const apiFriendRequestRoutes = {
  send: (senderId: string, receiverId: string): string =>
    `${baseUrl}/send?senderId=${senderId}&receiverId=${receiverId}`,

  reject: (requestId: string, receiverId: string): string =>
    `${baseUrl}/reject?requestId=${requestId}&receiverId=${receiverId}`,

  cancel: (requestId: string, senderId: string): string =>
    `${baseUrl}/cancel?requestId=${requestId}&senderId=${senderId}`,

  accept: (requestId: string, receiverId: string): string =>
    `${baseUrl}/accept?requestId=${requestId}&receiverId=${receiverId}`,

  getSentFriendRequestsByUserId: (
    userId: string,
    offset: number,
    limit: number
  ): string => `${baseUrl}/user/${userId}/sent?offset=${offset}&limit=${limit}`,

  getReceivedFriendRequestsByUserId: (
    userId: string,
    offset: number,
    limit: number
  ): string =>
    `${baseUrl}/user/${userId}/received?offset=${offset}&limit=${limit}`,
}

export default apiFriendRequestRoutes
