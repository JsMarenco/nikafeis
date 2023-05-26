// Third-party dependencies
import {
  Skeleton,
  CardHeader,
  Card,
  CardContent,
  CardActions,
} from "@mui/material"

// Current project dependencies
import { skeletonAnimation } from "@/utils/basic"

export const PostSkeleton = () => {
  return (
    <Card
      sx={{
        maxWidth: "md",
        mx: "auto",
        backgroundImage: "none",
        borderRadius: 3,
        boxShadow: 0,
      }}
    >
      <CardHeader
        avatar={
          <Skeleton
            animation={skeletonAnimation}
            variant="circular"
            width={45}
            height={45}
          />
        }
        action={<Skeleton animation={skeletonAnimation} variant="circular" />}
        title={
          <Skeleton
            animation={skeletonAnimation}
            variant="text"
            sx={{ width: "100%" }}
            height={25}
          />
        }
        subheader={
          <Skeleton
            animation={skeletonAnimation}
            variant="text"
            sx={{ width: "100%" }}
            height={20}
          />
        }
      />

      <CardContent>
        {/* post title */}
        <Skeleton
          animation={skeletonAnimation}
          variant="text"
          sx={{ width: "100%" }}
          height={20}
        />

        {/* post content */}
        <Skeleton
          animation={skeletonAnimation}
          variant="text"
          sx={{ width: "100%", mb: 2 }}
          height={20}
        />

        {/* post image */}
        <Skeleton
          animation={skeletonAnimation}
          variant="rectangular"
          sx={{ width: "100%" }}
          height={150}
        />
      </CardContent>

      <CardActions
        sx={{
          width: "100%",
          justifyContent: "space-between",
          maxWidth: "md",
          mx: "auto",
        }}
      >
        {/* like button */}
        <Skeleton
          animation={skeletonAnimation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />

        {/* comments button */}
        <Skeleton
          animation={skeletonAnimation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />

        {/* share button */}
        <Skeleton
          animation={skeletonAnimation}
          variant="text"
          sx={{ width: "80px", height: 20 }}
        />
      </CardActions>
    </Card>
  )
}

export default function PostSkeletonList() {
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  )
}
