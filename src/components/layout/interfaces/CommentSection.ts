export default interface CommentSection {
  post_id: string,

  commentsIds: Array<{
    id: string,
  }>,

  showComments: boolean,
  handleShowComments: () => boolean,
}