import { useState, ChangeEvent, useContext } from "react"

// Third-party dependencies

import { InputBase, IconButton, Avatar } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { useSelector } from "react-redux"

// Current project dependencies
import { ICreateComment } from "@/ts/interfaces/comment"
import httpStatus from "@/constants/common/httpStatus"
import { AppMessageContext } from "@/context/AppMessageContext"
import { RootState } from "@/app/store"
import createCommentService from "@/services/comment/createCommentService"

interface CreateCommentProps {
  postId: string
}

export default function CreateComment({ postId }: CreateCommentProps) {
  const [createCommentInfo, setCreateCommentInfo] = useState<ICreateComment>({
    content: "",
  })
  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(AppMessageContext)
  const { accountInfo, auth, personalInfo } = useSelector(
    (state: RootState) => state.user
  )

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreateCommentInfo({
      ...createCommentInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { message, status } = await createCommentService(
      createCommentInfo,
      accountInfo.id,
      postId,
      auth.accessToken
    )

    console.log("🚀 ~ file: index.tsx:51 ~ handleSubmit ~ message:", message)
    if (status === httpStatus.created.code) {
      handleMessage(message)
    }

    if (status === httpStatus.badRequest.code) {
      handleMessage(message)
    }

    setLoading(false)
  }

  return (
    <InputBase
      sx={{
        p: 1.5,
        borderRadius: 3,
        bgcolor: "background.default",
        mb: 1,
      }}
      placeholder="Type a comment"
      fullWidth
      value={createCommentInfo.content}
      onChange={(e) => handleChange(e)}
      name="content"
      disabled={loading}
      endAdornment={
        <IconButton
          aria-label="Button to send a commeent"
          onClick={handleSubmit}
          sx={{ ml: 2 }}
          disabled={loading}
        >
          <SendIcon />
        </IconButton>
      }
      startAdornment={
        <Avatar
          src={personalInfo.avatarUrl}
          alt={`${personalInfo.firstname} ${personalInfo.lastname}'s avatar`}
          sx={{
            width: 45,
            height: 45,
            mr: 2,
          }}
        >
          {personalInfo.firstname.charAt(0).toUpperCase()}
        </Avatar>
      }
    />
  )
}
