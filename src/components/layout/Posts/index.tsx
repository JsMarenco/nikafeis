import React, { useContext, useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import { GlobalContext } from "../../../context/GlobalState"

import { getPost, getRecentPosts } from "../../../services/post"
import { getUserPosts } from "../../../services/user"

import PostInterface from "../interfaces/Post"

import PostSkeleton from "../Skeletons/PostSkeleton"
import PostCard from "../../../components/layout/Cards/PostCard"

import {
  Box, Typography
} from "@mui/material"

export default function Post() {
  const { user } = useContext(GlobalContext)

  const { postId, userName } = useParams()

  const [loading, setLoading] = useState(true)

  const [posts, setPosts] = useState<PostInterface[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      let post

      if (postId) {
        post = await getPost(postId)

        // tranform to json 
        post = [post]
      } else if (userName) {
        if (userName === "me") {
          post = await getUserPosts(user.username)
        } else {
          post = await getUserPosts(userName)
        }
      } else {
        post = await getRecentPosts()
      }

      setPosts(post)

      setLoading(false)
    }

    fetchPosts()
  }, [])

  return (
    <>
      {
        loading ? (
          <Box sx={{
            display: "block",
            width: "100%",
          }}>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </Box>
        ) : posts.length !== 0 ? (
          posts.map((post, index: number) => {
            return (
              <PostCard
                key={`${index}_${post.id}`}
                id={post.id}

                title={post.title}
                body={post.body}
                image_src={post.image_src}

                likes={post.likes}
                comments={post.comments}
                shares={post.shares}

                user={post.user}

                created_at={post.created_at}
                updated_at={post.updated_at}
              />
            )
          })
        ) : (
          <>
            <Typography
              variant="h6"
              color="text.primary"
              align="center"
              mt={4}
              mb={8}
            >
              There are no posts yet, be the first to create one!
            </Typography>
          </>
        )
      }
    </>
  )
}
