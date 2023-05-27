// Third-party dependencies
import { faker } from "@faker-js/faker"

// Current project dependencies
import { IComment, ICreateComment } from "@/ts/interfaces/comment"
import { IPost } from "@/ts/interfaces/post"
import { IUser } from "@/ts/interfaces/user"
import Comment from "@/models/Comment"
import connectWithRetry from "@/database"
import Post from "@/models/Post"

export const generateFakeComment = (): ICreateComment => {
  return {
    content: faker.lorem.sentence(8),
  }
}

export const generateFakeComments = (limit: number): ICreateComment[] => {
  const posts: ICreateComment[] = []

  for (let i = 0; i < limit; i++) {
    const post: ICreateComment = generateFakeComment()

    posts.push(post)
  }

  return posts
}

export const uploadFakeCommentsToDB = async (
  users: IUser[],
  posts: IPost[],
  comments: ICreateComment[]
): Promise<IComment[]> => {
  try {
    await Comment.deleteMany({})

    await connectWithRetry()

    interface commentWithAuthorAndParentPost extends ICreateComment {
      author: string
      post: string
    }

    const commentsWithAuthorAndParentPost: commentWithAuthorAndParentPost[] = []

    for (let i = 0; i < users.length; i++) {
      const commentWithAuthorAndParentPost: commentWithAuthorAndParentPost = {
        ...comments[i],
        author: users[i].id,
        post: posts[i].id,
      }

      commentsWithAuthorAndParentPost.push(commentWithAuthorAndParentPost)
    }

    await Comment.insertMany(commentsWithAuthorAndParentPost)

    const postsDB = await Comment.find({})

    return postsDB
  } catch (error) {
    console.log("🚀 ~ file: comments.ts:62 ~ error:", error)
  }

  return []
}

export const addCommentsToPost = async (
  post: IPost,
  users: IUser[],
  comments: ICreateComment[]
): Promise<IPost> => {
  try {
    // Delete existing comments for the post
    await Comment.deleteMany({})

    // Connect to the database
    await connectWithRetry()

    const commentsWithAuthorAndPost: ICreateComment[] = comments.map(
      (comment, index) => {
        return {
          ...comment,
          author: users[index].id,
          post: post.id,
        }
      }
    )

    // Insert new comments into the database
    await Comment.insertMany(commentsWithAuthorAndPost)

    // Retrieve the updated post with comments
    const postWithComments = await Post.findById(post.id)

    return postWithComments
  } catch (error) {
    console.log("An error occurred:", error)
  }

  return {} as IPost
}
