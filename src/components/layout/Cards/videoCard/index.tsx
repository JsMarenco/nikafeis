import React, { useState } from "react"

import {
  contentStyles,
  avatarStyles,
  headerStyles,
  commentStyles
} from "../styles"

import { convertDate } from "../../../../utils"

import { copyToClipboard } from "../../../../services"

import IVideo from "../../interfaces/IVideo"

import {
  Box, Paper, Avatar, Typography, Tooltip, Button, Divider
} from "@mui/material"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ShareIcon from "@mui/icons-material/Share"

export default function VideoCard(props: IVideo) {
  const { id, title, description, publishedAt, thumbnail, channelTitle, url } = props

  const [liked, setLiked] = useState(false)
  const [shareText, setShareText] = useState("Share this post")
  const [postLikes, setPostLikes] = useState(0)
  const [comments, setComments] = useState([])

  const handleShare = () => {
    copyToClipboard(`Hey, check out this video I found on the website: ${url}`)

    setShareText("Link was copied to clipboard")

    setTimeout(() => {
      setShareText("Share this post")
    }, 5000)
  }

  const handleLike = async () => {
    // const post = liked ? await dislikePost(id) : await likePost(id)

    setLiked(!liked)
    setPostLikes(1)
    setComments([])
  }

  return (
    <Paper sx={contentStyles}>
      <Box sx={headerStyles}>
        <Avatar
          src={thumbnail}
          alt={title}
          sx={avatarStyles}
        // onClick={() => navigate(`/profile/${username}`)}
        />

        <Box sx={{ width: "100%" }}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            // onClick={() => navigate(`/profile/${username}`)}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {channelTitle}
          </Typography>

          <Typography variant="subtitle2" color="text.primary">
            {convertDate(String(publishedAt))}
          </Typography>
        </Box>

      </Box>

      <Typography
        variant="body1"
        color="text.primary"
        mb={1}
      >
        {description}
      </Typography>

      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        width="100%"
        height="300"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />



      <Divider sx={{ mt: 2, mb: 2 }} />

      <Box sx={commentStyles}>
        <Tooltip
          title={liked ? "Unlike" : "Like"}
          arrow
        >
          <Button
            variant="text"
            color={liked ? "primary" : "secondary"}
            endIcon={<FavoriteIcon />}
            onClick={handleLike}
          >
            {postLikes}
          </Button>
        </Tooltip>


        <Typography variant="body1" color="text.primary">
          {comments.length} comments
        </Typography>

        <Tooltip title={shareText} arrow>
          <Button
            variant="text"
            color="primary"
            startIcon={<ShareIcon />}
            onClick={handleShare}
          >
            Share
          </Button>
        </Tooltip>
      </Box>

    </Paper>
  )
}
