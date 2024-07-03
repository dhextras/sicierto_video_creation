import {
  readFile as nodeReadFile,
  writeFile as nodeWriteFile,
} from "node:fs/promises";
export const readFile = nodeReadFile;
export const writeFile = nodeWriteFile;

import type { Video } from "~/types/db";

export async function getVideos(): Promise<Video[]> {
  const filePath = "app/db/videos.json";
  const videos = await readFile(filePath, "utf8").then((data) =>
    JSON.parse(data)
  );
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return videos as Video[];
}

export async function deleteVideo(videoId: string): Promise<Video[]> {
  const videos = await getVideos();
  const filteredVideos = videos.filter((video) => video.id !== videoId);

  await writeFile(
    "app/db/videos.json",
    JSON.stringify(filteredVideos, null, 2)
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return filteredVideos as Video[];
}
