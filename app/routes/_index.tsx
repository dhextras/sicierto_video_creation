import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import {
  defer,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";

import VideoListItem from "~/components/VideoListItem";
import { deleteVideo, getVideos } from "~/db/utils";
import { Video } from "~/types/db";

export const meta: MetaFunction = () => {
  return [
    { title: "Sicerto" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async () => {
  const videos = await getVideos();
  return defer({ videos });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const action = formData.get("action");
  const videoKey = formData.get("key")?.toString();

  if (action === "delete_video" && videoKey) {
    await deleteVideo(videoKey);

    return json({ success: true });
  }
};

export default function Index() {
  const fetcher = useFetcher();
  const loaderData = useLoaderData<typeof loader>();
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    if (loaderData) {
      setVideos(loaderData.videos);
    }
  }, [loaderData]);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        overflow: "auto",
        gap: "20px",
      }}
    >
      {videos ? (
        videos.map((video) => (
          <VideoListItem
            key={video.id}
            video={video}
            onClick={() => {
              fetcher.submit(
                { action: "delete_video", key: video.id },
                { method: "post" }
              );
              setVideos(null);
            }}
          />
        ))
      ) : (
        <div>Loading videos...</div>
      )}
    </div>
  );
}
