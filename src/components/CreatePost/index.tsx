import { useContext, useState, ChangeEvent } from "react"

// Third-party dependencies
import { Box, InputBase, Typography, Button, Stack } from "@mui/material"
import { useSelector } from "react-redux"

// Current project dependencies
import { AppMessageContext } from "@/context/AppMessageContext"
import { ICreatePost } from "@/ts/interfaces/post"
import createPostService from "@/services/post/createPostService"
import { RootState } from "@/app/store"
import httpStatus from "@/constants/common/httpStatus"

export default function CreatePost() {
  const [createPostInfo, setCreatePostInfo] = useState<ICreatePost>({
    title: "",
    content: "",
  })

  const [loading, setLoading] = useState(false)
  const { handleMessage } = useContext(AppMessageContext)
  const { accountInfo, auth } = useSelector((state: RootState) => state.user)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCreatePostInfo({ ...createPostInfo, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { message, status } = await createPostService(
      createPostInfo,
      accountInfo.id,
      auth.accessToken
    )

    if (status === httpStatus.created.code) {
      handleMessage(message)
    }

    if (status === httpStatus.badRequest.code) {
      handleMessage(message)
    }

    setLoading(false)
  }

  return (
    <Box
      sx={{
        borderRadius: 3,
        bgcolor: "background.paper",
        p: 4,
        maxWidth: "md",
      }}
    >
      <Typography
        variant="subtitle1"
        color="text.primary"
        fontWeight={300}
        align="left"
        mb={1}
      >
        Create post
      </Typography>

      <InputBase
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: "background.default",
          mb: 1,
        }}
        placeholder="Your title"
        fullWidth
        value={createPostInfo.title}
        onChange={(e) => handleChange(e)}
        name="title"
        disabled={loading}
      />

      <InputBase
        sx={{
          p: 2,
          borderRadius: 3,
          bgcolor: "background.default",
          minHeight: "150px",
          display: "flex",
          alignItems: "initial",
          justifyContent: "start",
        }}
        placeholder="Write your content"
        fullWidth
        value={createPostInfo.content}
        onChange={(e) => handleChange(e)}
        name="content"
        disabled={loading}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="end"
        spacing={2}
        mt={2}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          Create
        </Button>
      </Stack>
    </Box>
  )
}
