import { Request, Response, NextFunction } from "express"

import axios from "axios"

const getTopVideos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&q=
    ${process.env.YOUTUBE_QUERY}
    &type=video&key=${process.env.YOUTUBE_API_KEY}`

    const { data } = await axios.get(url)

    interface RawVideo {
      id: {
        videoId: string
      },
      snippet: {
        title: string
        description: string
        publishedAt: string
        thumbnails: {
          default: {
            url: string
          },
          medium: {
            url: string
          }
        },
        channelTitle: string
      },
    }

    interface Video {
      id: string
      title: string
      description: string
      publishedAt: string
      thumbnail: string
      channelTitle: string
      url: string
    }

    // get the videos array
    const videosArr = data.items

    const videosInfo: Video[] = []

    videosArr.map((video: RawVideo) => {
      const videoId = video.id.videoId
      const videoTitle = video.snippet.title
      const videoDescription = video.snippet.description
      const videoThumbnail = video.snippet.thumbnails.medium.url
      const videoPublishedAt = video.snippet.publishedAt

      const newVideo = {
        id: videoId,
        title: videoTitle,
        description: videoDescription,
        thumbnail: videoThumbnail,
        publishedAt: videoPublishedAt,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        channelTitle: video.snippet.channelTitle,
      }

      videosInfo.push(newVideo)
    })

    res.json(videosInfo)
  }
  catch (error) {
    console.log(`Error in getTopVideos: ${error}`)

    return res.status(500).json({
      message: "Something went wrong",
    })

    next(error)
  }
}

export default getTopVideos