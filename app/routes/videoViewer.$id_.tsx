import invariant from "tiny-invariant";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ReactPlayer from "react-player";

import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");

  //Actually fetch the video later on the process maybe using the params.id but for now just use some prebuilt video

  return json({
    title: params.id,
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });
};

export default function VideoViewer() {
  const { title, videoUrl } = useLoaderData<{
    title: string;
    videoUrl: string;
  }>();

  return (
    <div className="w-full">
      <h1>{title}</h1>
      <div className="relative w-full">
        <ReactPlayer url={videoUrl} controls={true} />
      </div>
    </div>
  );
}
