import { useContext, useState } from "react"

// Third-party dependencies
import { useSelector } from "react-redux"

// Current project dependencies
import PostCardUI from "./PostCardUI"
import { IPostWithPopulated } from "@/ts/interfaces/post"
import likePostService from "@/services/post/likePostService"
import { RootState } from "@/app/store"
import { AppMessageContext } from "@/context/AppMessageContext"

export default function PostCard(postProps: IPostWithPopulated) {
  // eslint-disable-next-line no-unused-vars
  const [post, setPost] = useState<IPostWithPopulated>(postProps)
  const { accountInfo, auth } = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(AppMessageContext)

  const handleLike = async () => {
    const { body, message, success } = await likePostService(
      post.id,
      accountInfo.id,
      auth.accessToken
    )

    if (success) {
      setPost((prevPost) => ({ ...prevPost, likes: body.likes }))
    }

    handleMessage(message)
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
        id={post.id}
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
