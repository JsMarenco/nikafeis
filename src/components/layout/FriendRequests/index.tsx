import React, { useEffect, useState } from "react"

import IFriendRequest from "../interfaces/IFriendRequest"

import UserCard from "../Cards/UserCard"

import {
  Typography
} from "@mui/material"

const fakeFriendRequests = [
  {
    id: "1",

    name: "Mia",
    lastName: "Khalifa",
    username: "mia_khalifa",

    avatar: "https://imgs.search.brave.com/aqNX3qB_28e6E3dfaBVdrlPoG8zakT6DOCSUjd59FP4/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5L/MjczZm1tb0xJZDJY/QTk5ZXI2QkV3SGFI/YSZwaWQ9QXBp",

    requestedAt: "2022-01-01T00:00:00.000Z",
  },
  {
    id: "2",

    name: "Lana",
    lastName: "Rhoades",
    username: "lana_rhoades",

    avatar: "https://imgs.search.brave.com/PLVVrWteUaaOVOVX-rsjVzdpBT-yDBYOMymjny4ScFM/rs:fit:666:225:1/g:ce/aHR0cHM6Ly90c2Uz/LmV4cGxpY2l0LmJp/bmcubmV0L3RoP2lk/PU9JUC5MY2ZTdzRo/TnZlSng1N1dOU3Za/ZmJBSGFGUiZwaWQ9/QXBp",

    requestedAt: "2022-01-01T00:00:00.000Z",
  },
]

export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([] as IFriendRequest[])
  const [friendRequestsCount, setFriendRequestsCount] = useState(0)

  useEffect(() => {
    setFriendRequests(fakeFriendRequests)
    setFriendRequestsCount(fakeFriendRequests.length)
  }, [])

  return (
    <>
      <Typography
        variant="h6"
        color="text.primary"
        align="center"
        mt={2}
        mb={2}
      >
        {`You have ${friendRequestsCount} friend requests`}
      </Typography>

      {
        friendRequests.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mt={2}
            mb={2}
          >
            Your friend requests will appear here
          </Typography>
        ) : (
          friendRequests.map((friendRequest) => {
            return (
              <UserCard
                key={friendRequest.id}
                id={friendRequest.id}
                name={friendRequest.name}
                lastName={friendRequest.lastName}
                username={friendRequest.username}
                avatar={friendRequest.avatar}
                requestedAt={friendRequest.requestedAt}
              />
            )
          })
        )
      }
    </>
  )
}
