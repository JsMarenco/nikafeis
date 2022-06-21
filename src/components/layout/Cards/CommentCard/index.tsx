import React, { useContext } from "react"

import { useNavigate } from "react-router-dom"

import { GlobalContext } from "../../../../context/GlobalState"

import { commentContainerStyles, nameStyles } from "./styles"

import { convertDate } from "../../../../utils"

import { likeComment } from "../../../../services/comments"

import Comment from "../../interfaces/Comment"

import {
  Avatar, Stack, Typography, Tooltip, Button, Accordion, AccordionSummary, AccordionDetails, Divider,
} from "@mui/material"

import FavoriteIcon from "@mui/icons-material/Favorite"
import ReplyIcon from "@mui/icons-material/Reply"
import FlagIcon from "@mui/icons-material/Flag"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function CommentCard(props: Comment) {
  const { user } = useContext(GlobalContext)

  const navigate = useNavigate()

  const {
    id = "",

    body = "",
    image_src = "",

    likes = [],
    replies = [],

    updated_at = "",
    created_at = "",
  } = props

  const {
    name = "",
    lastName = "",
    avatar = "",
    username = "",
  } = props.user


  const [commentLikes, setCommentLikes] = React.useState(likes)

  const handleLike = async () => {
    likeComment(user, id)
      .then((res) => {

        setCommentLikes(res.data.likes)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Accordion
      sx={commentContainerStyles}
      id={id}
    >
      <AccordionSummary
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Avatar
          src={avatar}
          sizes="small"
          alt={name}
          sx={{
            mr: 2,
          }}
        />

        <Stack>
          <Tooltip title="View profile" arrow>
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={nameStyles}
              onClick={() => navigate(`/profile/${username}`)}
            >
              {`${name} ${lastName}`}
            </Typography>

          </Tooltip>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            {
              updated_at === created_at ? (
                convertDate(created_at)
              ) : (
                `${convertDate(created_at)} update at ${convertDate(updated_at)}`
              )
            }
          </Typography>
        </Stack>
      </AccordionSummary>

      <AccordionDetails>
        <Stack spacing={2}>
          <Typography
            variant="body1"
            color="text.primary"
          >
            {body}
          </Typography>

          {
            image_src ? (
              <img
                src={image_src}
                alt={`comment of ${name} ${lastName}`}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                  borderRadius: "15px"
                }}
              />
            ) : (
              <></>
            )
          }
        </Stack>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Tooltip title="Like" arrow>
            <Button
              variant="text"
              color="primary"
              endIcon={<FavoriteIcon sx={{ mr: 0 }} />}
              size="small"
              onClick={handleLike}
            >
              {commentLikes.length}
            </Button>
          </Tooltip>

          <Tooltip title={`Reply to ${name}`} arrow>
            <Button
              variant="text"
              color="primary"
              endIcon={<ReplyIcon />}
            >
              {replies.length}
            </Button>
          </Tooltip>

          <Tooltip title="Report this comment" arrow>
            <Button
              variant="text"
              color="primary"
              endIcon={<FlagIcon />}
            />
          </Tooltip>
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
