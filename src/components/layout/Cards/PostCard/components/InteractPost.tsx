import React from "react"

import { commentStyles } from "../../styles"

import InteractPostInterface from "./interfaces/InteractPost"

import {
  Box, Button, Tooltip
} from "@mui/material"

import ShareIcon from "@mui/icons-material/Share"
import FavoriteIcon from "@mui/icons-material/Favorite"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import FlagIcon from "@mui/icons-material/Flag"

export default function InteractPost(props: InteractPostInterface) {
  const {
    handleLike = () => {
      console.log("liked")
    },
    handleShare = () => {
      console.log("shared")
    },
    handleReport = () => {
      console.log("reported")
    },
    handleShowComments = () => {
      console.log("show comments")
    },
    likes = 0,
    comments = 0,
  } = props


  return (
    <Box sx={commentStyles}>
      <Tooltip title="Like" arrow>
        <Button
          variant="text"
          color="primary"
          endIcon={<FavoriteIcon />}
          onClick={handleLike}
        >
          {likes}
        </Button>
      </Tooltip>

      <Tooltip title="View comments" arrow>
        <Button
          variant="text"
          color="primary"
          endIcon={<QuestionAnswerIcon />}
          onClick={handleShowComments}
        >
          {comments}
        </Button>

      </Tooltip>

      <Tooltip title="Share this post" arrow>
        <Button
          variant="text"
          color="primary"
          startIcon={<ShareIcon />}
          onClick={handleShare}
        >
          Share
        </Button>
      </Tooltip>

      <Tooltip title="Report this post" arrow>
        <Button
          variant="text"
          color="primary"
          endIcon={<FlagIcon />}
          onClick={handleReport}
        />
      </Tooltip>
    </Box>
  )
}
