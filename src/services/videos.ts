import axios from "axios"

import { GET_RECENT_VIEOS } from "../components/contants"

export const getRecentVideos = async () => {
  const res = await axios.get(GET_RECENT_VIEOS)

  return res.data
}
