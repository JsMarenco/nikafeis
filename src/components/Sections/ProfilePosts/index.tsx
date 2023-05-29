// Third-party dependencies

import PostsList from "@/components/Lists/PostsList"
import getPostsByUsernameService from "@/services/user/getPostsByUsernameService"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import { useState, useEffect } from "react"

// Current project dependencies

interface ProfilePostsProps {
  username: string
}

export default function ProfilePosts({ username }: ProfilePostsProps) {
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

    const { body, success } = await getPostsByUsernameService(
      username,
      offset,
      limit
    )

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
    </>
  )
}
