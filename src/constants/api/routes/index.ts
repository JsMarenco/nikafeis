// Third-party dependencies

// Current project dependencies
import apiFriendRequestRoutes from "./friendRequest"
import apiPostRoutes from "./posts"
import apiUserRoutes from "./user"
import apiCommentsRoutes from "./comments"

const apiRoutes = {
  user: apiUserRoutes,
  friendRequest: apiFriendRequestRoutes,
  post: apiPostRoutes,
  comment: apiCommentsRoutes,
}

export default apiRoutes
