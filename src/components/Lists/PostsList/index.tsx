import PostCard from "@/components/Cards/PostCard"
import PostSkeletonList from "@/components/Skeletons/PostSkeleton"
import getRecentPostsService from "@/services/post/getRecentPostsService"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import { Stack } from "@mui/material"
import { useEffect, useState } from "react"

// Third-party dependencies

// Current project dependencies

export default function PostsList() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<IPostWithPopulated[]>([])
  const [offset, setOffset] = useState(0)
  const limit = 5

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    const { body, success } = await getRecentPostsService(offset, limit)

    if (success) {
      setPosts((prevPosts) => prevPosts.concat(body))
      setOffset(offset + limit)
      setLoading(false)
    }
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </Stack>

      {loading && <PostSkeletonList />}
    </>
  )
}
