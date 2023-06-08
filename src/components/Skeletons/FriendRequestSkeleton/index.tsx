import React from "react"
import { FriendRequestSkeletonLargeList } from "./Variant/Large"
import { FriendRequestSkeletonSmallList } from "./Variant/Small"

interface Props {
  variant: "small" | "large"
}

export default function FriendRequestSkeleton(props: Props) {
  return (
    <>
      {props.variant === "large" && <FriendRequestSkeletonLargeList />}

      {props.variant === "small" && <FriendRequestSkeletonSmallList />}
    </>
  )
}
