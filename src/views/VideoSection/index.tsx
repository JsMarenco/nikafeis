import React, { useEffect, useState } from "react"

import { changeTitle } from "../../services"
import { getRecentVideos } from "../../services/videos"

import IVideo from "../../components/layout/interfaces/IVideo"

import Header from "../../components/layout/Header"
import VideoSkeleton from "../../components/layout/Skeletons/VideoSkeleton"
import VideoCard from "../../components/layout/Cards/videoCard"

import {
  Box
} from "@mui/material"

export default function VideoSection() {
  const [videos, setVideos] = useState([] as IVideo[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const videos = await getRecentVideos()

      setVideos(videos)
    }

    changeTitle("Videos")

    fetchData()

    setLoading(false)
  }, [])

  return (
    <>
      <Header />

      {
        loading ? (
          <Box>
            <VideoSkeleton />
            <VideoSkeleton />
            <VideoSkeleton />
          </Box>
        ) : (
          <Box sx={{ ml: 1, mr: 1 }} >
            {
              videos.map(video => {
                return (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    title={video.title}
                    description={video.description}
                    publishedAt={video.publishedAt}
                    thumbnail={video.thumbnail}
                    channelTitle={video.channelTitle}
                    url={video.url}
                  />
                )
              })
            }
          </Box>

        )
      }
    </>
  )
}