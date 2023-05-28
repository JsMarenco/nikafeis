import { useEffect, useState } from "react"

// Third-party dependencies
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogActions,
  DialogContent,
  Stack,
  Button,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

// Current project dependencies
import CreateComment from "@/components/CreateComment"
import CommentSkeletonList from "@/components/Skeletons/CommentSkeleton"
import { ICommentWithPopulated } from "@/ts/interfaces/comment"
import CommentCard from "@/components/Cards/CommentCard"
import getCommentsService from "@/services/comment/getCommentsService"

interface CommentsListProps {
  postId: string
  open: boolean
  handleClose: () => void
}

export default function CommentsList({
  open,
  handleClose,
  postId,
}: CommentsListProps) {
  const [comments, setComments] = useState<ICommentWithPopulated[]>([])
  const [loading, setLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [offset, setOffset] = useState(0)
  const limit = 5

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async () => {
    setLoading(true)

    const { body, success } = await getCommentsService(postId, offset, limit)

    if (success) {
      setComments((prevComments) => prevComments.concat(body.comments))

      if (body.hasNextPage) {
        setOffset(offset + limit)
      } else {
        setHasNextPage(false)
      }

      setLoading(false)
    }
  }

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={handleClose}
      sx={{
        backgroundImage: "none",
        borderRadius: 3,
        p: 3,
      }}
    >
      <DialogTitle
        className="flex items-center justify-between"
        component="div"
      >
        <Typography variant="subtitle1" color="text.primary" fontWeight={400}>
          Comments
        </Typography>

        <IconButton aria-label="Close comments section" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          {comments.map((comment) => (
            <CommentCard key={comment.id} {...comment} />
          ))}

          {!loading && hasNextPage && (
            <Button variant="text" color="primary" onClick={fetchData}>
              Load more comments
            </Button>
          )}

          {loading && <CommentSkeletonList />}
        </Stack>
      </DialogContent>

      <DialogActions>
        <CreateComment postId={postId} />
      </DialogActions>
    </Dialog>
  )
}
