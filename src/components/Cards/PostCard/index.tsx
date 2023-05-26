// Third-party dependencies

// Current project dependencies
import { useState } from "react"
import PostCardUI from "./PostCardUI"
import { IPostWithPopulated } from "@/ts/interfaces/post"

export default function PostCard(postProps: IPostWithPopulated) {
  // eslint-disable-next-line no-unused-vars
  const [post, setPost] = useState<IPostWithPopulated>(postProps)

  const handleLike = async () => {
    console.log("Liked")
  }

  const handleOpenCommentsMenu = async () => {
    console.log("opened")
  }

  const handleSharePost = async () => {
    console.log("shared")
  }

  return (
    <>
      <PostCardUI
        author={post.author}
        comments={post.comments}
        title={post.title}
        content={post.content}
        views={post.views}
        shares={post.shares}
        likes={post.likes}
        reports={post.reports}
        postImages={post.postImages}
        createdAt={post.createdAt}
        updatedAt={post.updatedAt}
        handleLike={handleLike}
        handleOpenCommentsMenu={handleOpenCommentsMenu}
        handleSharePost={handleSharePost}
      />
    </>
  )
}
