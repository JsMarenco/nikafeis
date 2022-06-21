import React, { useEffect, useState } from "react"

import UserCard from "../../components/layout/Cards/UserCard"
import FriendRequests from "../../components/layout/FriendRequests"
import Header from "../../components/layout/Header"
import IFriendRequest from "../../components/layout/interfaces/IFriendRequest"
import UserCardSkeleton from "../../components/layout/Skeletons/UserCardSkeleton"

import { Divider, Typography } from "@mui/material"

const fakeFriendRequests = [
  {
    id: "1",

    name: "John",
    lastName: "Doe",
    username: "kmkdljdsjm",

    avatar: "https://randomuser.me/api/portraits",

    requestedAt: "2020-01-01T00:00:00.000Z",
  }
]

export default function Friends() {
  const [peopleYouMayKnow, setPeopleYouMayKnow] = useState<IFriendRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPeopleYouMayKnow(fakeFriendRequests)
    setLoading(false)
  }, [])


  return (
    <>
      <Header />

      <FriendRequests />

      <Divider sx={{ m: 2 }} />

      <Typography
        variant="h6"
        color="text.primary"
        align="center"
        mt={2}
        mb={2}
      >
        {"People you may know"}
      </Typography>

      {
        loading ? (
          <UserCardSkeleton />
        ) : peopleYouMayKnow.length === 0 ? (
          <>
            <Typography
              variant="h6"
              color="text.primary"
              align="center"
              mt={2}
              mb={2}
            >
              You don{"'"}t have any people you may know
            </Typography>
          </>
        ) : (
          peopleYouMayKnow.map((friendRequest: IFriendRequest) => {
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
