import { json,type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import VideoListItem from "~/components/VideoListItem";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface Video {
  id: string;
  thumbnail: string;
  title: string;
}

export const loader = async () => {
  // Gotta fetch this from the database on production
  const videos: Video[] = [
    {
      id: "abc123",
      thumbnail: "/favicon.ico",
      title: "Video 1",
    },
    {
      id: "def456",
      thumbnail: "/favicon.ico",
      title: "Video 2",
    },
    {
      id: "abc123",
      thumbnail: "/favicon.ico",
      title: "Video 1",
    },
    {
      id: "def456",
      thumbnail: "/favicon.ico",
      title: "Video 2",
    },
    {
      id: "abc123",
      thumbnail: "/favicon.ico",
      title: "Video 1",
    },
    {
      id: "def456",
      thumbnail: "/favicon.ico",
      title: "Video 2",
    },
  ];

  return json(videos);
};

export default function Index() {
  const videos = useLoaderData<typeof loader>();
  
  return (
    <div style={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      overflow: "auto",
      gap: "20px",
    }}>
      {videos.map((video) => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </div>
  );
}
