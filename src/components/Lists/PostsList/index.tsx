// Third-party dependencies
import { Stack, Button } from "@mui/material"

// Current project dependencies
import PostSkeletonList from "@/components/Skeletons/PostSkeleton"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import PostCard from "@/components/Cards/PostCard"

interface PostsListProps {
  posts: IPostWithPopulated[]
  handleFetchPosts: () => void
  loading: boolean
  hasNextPage: boolean
}

export default function PostsList({
  loading,
  handleFetchPosts,
  posts,
  hasNextPage,
}: PostsListProps) {
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        {!loading && hasNextPage && (
          <Button variant="text" color="primary" onClick={handleFetchPosts}>
            Load more post
          </Button>
        )}

        {loading && <PostSkeletonList />}
      </Stack>
    </>
  )
}
