import React, { useContext, useState } from "react"

import { GlobalContext } from "../../../../context/GlobalState"

import { contentStyles } from "../styles"

import { copyToClipboard } from "../../../../services"
import { generateShareLink, likePost } from "../../../../services/post"

import Post from "../../interfaces/Post"

import InteractPost from "./components/InteractPost"
import HeaderPost from "./components/HeaderPost"
import ContentPost from "./components/ContentPost"
import CommentSection from "../../CommentSection"

import {
  Divider, Paper,
} from "@mui/material"

export default function PostCard(props: Post) {
  const { user } = useContext(GlobalContext)

  const {
    id = "", title = "", body = "", image_src = "", likes = [],
    comments = [], shares = [], updated_at = "", created_at = "",
  } = props

  const { name = "", lastName = "", avatar = "", username = "", } = props.user

  const [postLikes, setPostLikes] = useState(likes.length)
  const [commentsArray, setComments] = useState(comments)
  const [showComments, setShowComments] = useState(false)

  const handleShare = () => {
    const link = generateShareLink(props.id)

    copyToClipboard(`Hey, check out this post ${link}`)
  }

  const handleLike = async () => {
    likePost(user, id)
      .then((post) => {
        setPostLikes(post.likes.length)

        setComments(post.comments)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleShowComments = () => {
    setShowComments(!showComments)

    return showComments
  }

  const handleReport = () => {
    console.log("report")
  }

  return (
    <Paper sx={contentStyles}>
      <HeaderPost
        id={id}

        name={name}
        lastName={lastName}
        avatar={avatar}
        username={username}

        created_at={created_at}
        updated_at={updated_at}
      />

      <ContentPost
        title={title}
        body={body}
        image_src={image_src}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <InteractPost
        comments={commentsArray.length}
        likes={postLikes}
        shares={shares.length}

        handleLike={handleLike}
        handleShare={handleShare}
        handleReport={handleReport}
        handleShowComments={handleShowComments}
      />

      <Divider sx={{ mt: 2, mb: 2 }} />

      <CommentSection
        commentsIds={comments}
        handleShowComments={handleShowComments}
        showComments={showComments}
        post_id={id}
      />
    </Paper>
  )
}