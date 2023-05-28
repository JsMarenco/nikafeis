import PostCard from "@/components/Cards/PostCard"
import PostSkeletonList from "@/components/Skeletons/PostSkeleton"
import getRecentPostsService from "@/services/post/getRecentPostsService"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import { Stack, Button } from "@mui/material"
import { useEffect, useState } from "react"

// Third-party dependencies

// Current project dependencies

export default function PostsList() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<IPostWithPopulated[]>([])
  const [offset, setOffset] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)
  const limit = 5

  useEffect(() => {
    fetchData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const { body, success } = await getRecentPostsService(offset, limit)

    if (success) {
      setPosts((prevPosts) => prevPosts.concat(body.posts))

      if (body.hasNextPage === true) {
        setOffset(offset + limit)
      } else {
        setHasNextPage(false)
      }

      setLoading(false)
    }
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}

        {!loading && hasNextPage && (
          <Button variant="text" color="primary" onClick={fetchData}>
            Load more post
          </Button>
        )}

        {loading && <PostSkeletonList />}
      </Stack>
    </>
  )
}
