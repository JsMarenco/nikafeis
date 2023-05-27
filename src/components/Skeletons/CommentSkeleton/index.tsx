import React from "react"

// Third-party dependencies
import { Skeleton, Card, CardHeader, CardContent } from "@mui/material"
import { skeletonAnimation } from "@/utils/basic"

// Current project dependencies

const CommentSkeleton = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton
            animation={skeletonAnimation}
            variant="circular"
            width={45}
            height={45}
          />
        }
        title={
          <Skeleton
            animation={skeletonAnimation}
            variant="text"
            sx={{ width: "180px" }}
            height={25}
          />
        }
        subheader={
          <Skeleton
            animation={skeletonAnimation}
            variant="text"
            sx={{ width: "120px" }}
            height={25}
          />
        }
      />

      <CardContent>
        <Skeleton animation={skeletonAnimation} variant="text" height={25} />
        <Skeleton animation={skeletonAnimation} variant="text" height={25} />
        <Skeleton animation={skeletonAnimation} variant="text" height={25} />
        <Skeleton animation={skeletonAnimation} variant="text" height={25} />
      </CardContent>
    </Card>
  )
}

export default function CommentSkeletonList() {
  return (
    <>
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
      <CommentSkeleton />
    </>
  )
}
