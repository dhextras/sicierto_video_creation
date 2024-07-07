import { Video } from "~/types/db";

export async function uploadToYouTube(
  videoData: Video & { description: string; tags: string[] }
): Promise<{ success: boolean; url: string }> {
  // This is a mock function simulating YouTube upload
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const success = Math.random() < 0.75;
  return {
    success,
    url: success ? videoData.file : "",
  };
}
