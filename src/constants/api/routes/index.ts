// Third-party dependencies

// Current project dependencies
import apiFriendRequest from "./friendRequest"
import apiPostRoutes from "./posts"
import apiUserRoutes from "./user"

const apiRoutes = {
  user: apiUserRoutes,
  friendRequest: apiFriendRequest,
  post: apiPostRoutes,
}

export default apiRoutes
