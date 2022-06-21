import React, { useContext, useEffect, useState } from "react"

import { GlobalContext } from "../../../context/GlobalState"  

import { getCommentsByPostId } from "../../../services/comments"

import CommentSectionInterface from "../interfaces/CommentSection"
import CommentInterface from "../interfaces/Comment"

import CreateComment from "../CreateComment"
import CommentCard from "../Cards/CommentCard"

import {
  Accordion, AccordionSummary, AccordionDetails, Typography, Button
} from "@mui/material"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

export default function CommentSection(props: CommentSectionInterface) {
  const {
    showComments = false,
    handleShowComments,
    commentsIds = [],

    post_id = "",
  } = props

  const [comments, setComments] = useState<CommentInterface[]>([])

  const [limit, setLimit] = useState(10)

  const { user } = useContext(GlobalContext)

  useEffect(() => {
    getCommentsByPostId(user, post_id, 0, limit)
      .then((res) => {
        setComments(res.data)
      })
      .catch((err) => {
        console.log(err.response.data)
      })
  }, [limit])

  return (
    <Accordion
      sx={{ mt: 2, boxShadow: "none", "&:before": { position: "initial", } }}
      expanded={showComments}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={handleShowComments}
      >
        <Typography variant="body1" color="text.primary">
          Comments ({commentsIds.length})
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {
          comments && comments.length > 0 ? (
            <>
              {
                comments.map((comment) => {
                  return (
                    <CommentCard
                      key={comment.id}
                      id={comment.id}
                      post_id={post_id}

                      body={comment.body}
                      image_src={comment.image_src}

                      likes={comment.likes}
                      replies={comment.replies}

                      user={comment.user}

                      updated_at={comment.updated_at}
                      created_at={comment.created_at}
                    />
                  )
                })
              }

              <Button
                variant="text"
                color="primary"
                onClick={() => setLimit(limit + 10)}
                disabled={comments.length < limit}
              >
                show more comments
              </Button>
            </>
          ) : (
            <Typography
              variant="body1"
              color="text.primary"
              align="center"
            >
              Be the first to comment!
            </Typography>
          )
        }
      </AccordionDetails>

      <AccordionDetails>
        <CreateComment
          post_id={post_id}
        />
      </AccordionDetails>
    </Accordion>
  )
}
