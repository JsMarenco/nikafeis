export default interface Comment {
  id: string,
  post_id: string,

  body: string,
  image_src: string,

  likes: Array<{
    id: string,

    name: string,
    lastName: string,
    avatar: string,
    username: string
  }>,
  replies: Array<{
    id: string,

    body: string,
    image_src: string,

    likes: Array<{
      id: string,
      name: string,
      lastName: string,
      avatar: string,
      username: string
    }>,

    user: {
      id: string,
      name: string,
      lastName: string,
      avatar: string,
      username: string
    },

    created_at: string,
    updated_at: string,
  }>,

  user: {
    id: string,

    name: string,
    lastName: string,
    avatar: string,
    username: string
  },

  created_at: string,
  updated_at: string,
}
