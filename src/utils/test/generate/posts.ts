// Third-party dependencies
import { faker } from "@faker-js/faker"

// Current project dependencies
import { ICreatePost, IPost } from "@/ts/interfaces/post"
import { IUser } from "@/ts/interfaces/user"
import Post from "@/models/Post"
import connectWithRetry from "@/database"

interface postWithAuthor extends ICreatePost {
  author: string
  postImages: string[]
}

export const generateFakerPost = (): ICreatePost => {
  return {
    title: faker.lorem.words(4),
    content: faker.lorem.sentence(8),
  }
}

export const generateFakePosts = (limit: number): ICreatePost[] => {
  const posts: ICreatePost[] = []

  for (let i = 0; i < limit; i++) {
    const post: ICreatePost = generateFakerPost()

    posts.push(post)
  }

  return posts
}

export const uploadFakePostsToDB = async (
  posts: ICreatePost[],
  users: IUser[]
): Promise<IPost[]> => {
  try {
    await Post.deleteMany({})

    await connectWithRetry()

    const postsWithAuthor: postWithAuthor[] = []

    for (let i = 0; i < users.length; i++) {
      const postWIthAuthor: postWithAuthor = {
        ...posts[i],
        author: users[i].id,
        postImages: [],
      }

      postsWithAuthor.push(postWIthAuthor)
    }

    await Post.insertMany(postsWithAuthor)

    const postsDB = await Post.find({})

    return postsDB
  } catch (error) {
    console.log("🚀 ~ file: posts.ts:62 ~ error:", error)
  }

  return []
}

export const createPostsForUser = async (
  user: IUser,
  posts: ICreatePost[]
): Promise<IPost[]> => {
  try {
    await Post.deleteMany({})

    await connectWithRetry()

    const postsWithAuthor: postWithAuthor[] = posts.map((post) => ({
      ...post,
      author: user.id,
      postImages: [],
    }))

    await Post.insertMany(postsWithAuthor)

    const postsDB = await Post.find({ author: user.id })

    return postsDB
  } catch (error) {
    console.log("🚀 ~ file: posts.ts:62 ~ error:", error)
    return []
  }
}
