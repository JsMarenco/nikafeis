export default interface InteractPost {
  handleLike: () => void,
  handleShare: () => void,
  handleReport: () => void,
  handleShowComments: () => boolean,
  
  likes: number,
  comments: number,
  shares: number,
}