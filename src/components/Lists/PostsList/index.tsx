import { useEffect, useState } from "react"

// Third-party dependencies
import { Stack, Button, Typography, Box } from "@mui/material"

// Current project dependencies
import PostSkeletonList from "@/components/Skeletons/PostSkeleton"
import getRecentPostsService from "@/services/post/getRecentPostsService"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import PostCard from "@/components/Cards/PostCard"
import noPostsPng from "@/assets/images/bg_no_posts.png"

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

        {!loading && !hasNextPage && posts.length === 0 && (
          <Box>
            <Box
              sx={{
                backgroundImage: `url(${noPostsPng.src})`,
                height: "350px",
                width: "auto",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />

            <Typography
              variant="subtitle1"
              color="text.primary"
              align="center"
              fontWeight={400}
              my={2}
            >
              Be the first! Create an amazing post.
            </Typography>
          </Box>
        )}

        {loading && <PostSkeletonList />}
      </Stack>
    </>
  )
}
