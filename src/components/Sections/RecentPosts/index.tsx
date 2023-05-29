import { useState, useEffect } from "react"

// Third-party dependencies
import { Box, Typography } from "@mui/material"

// Current project dependencies
import PostsList from "@/components/Lists/PostsList"
import getRecentPostsService from "@/services/post/getRecentPostsService"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import noPostsPng from "@/assets/images/bg_no_posts.png"

export default function RecentPosts() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<IPostWithPopulated[]>([])
  const [offset, setOffset] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(true)
  const limit = 5

  useEffect(() => {
    handleFetchPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFetchPosts = async () => {
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
      <PostsList
        posts={posts}
        handleFetchPosts={handleFetchPosts}
        loading={loading}
        hasNextPage={hasNextPage}
      />

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
    </>
  )
}
