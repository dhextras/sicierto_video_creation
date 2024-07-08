import type { Script, PendingVideo } from "~/types/db";
import { promises as fs } from "fs";
import path from "path";

const PENDING_VIDEOS_FILE = path.join(
  process.cwd(),
  "app/db/pendingVideos.json"
);

// Helper function to read pending videos from JSON file
async function readPendingVideos(): Promise<PendingVideo[]> {
  try {
    const data = await fs.readFile(PENDING_VIDEOS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write pending videos to JSON file
async function writePendingVideos(videos: PendingVideo[]): Promise<void> {
  await fs.writeFile(PENDING_VIDEOS_FILE, JSON.stringify(videos, null, 2));
}

// Simulate sending data to the extension
export async function sendToExtension(script: Script): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      // 50% chance of success (3:1 ratio)
      const success = Math.random() < 0.75;
      if (success) {
        await addPendingVideo(script.id);
      }
      resolve(success);
    }, 2000);
  });
}

// Simulate receiving updates from the extension
export function listenToExtensionUpdates(
  scriptId: string,
  onUpdate: (step: string, progress: number) => void
): () => void {
  const steps = [
    "Preparing script",
    "Generating video content",
    "Adding voiceover",
    "Applying visual effects",
    "Finalizing video",
  ];

  let currentStep = 0;

  const interval = setInterval(async () => {
    if (currentStep < steps.length) {
      const progress = (currentStep / steps.length) * 100;
      onUpdate(steps[currentStep], progress);
      await updatePendingVideo(scriptId, steps[currentStep], progress);
      currentStep++;
    } else {
      clearInterval(interval);
      onUpdate("Complete", 100);
      await updatePendingVideo(scriptId, "Complete", 100);
      await removePendingVideo(scriptId);
    }
  }, 3000);

  // Return a function to stop listening
  return () => clearInterval(interval);
}

// Add a new pending video
async function addPendingVideo(scriptId: string) {
  const pendingVideos = await readPendingVideos();
  pendingVideos.push({
    id: scriptId,
    currentStep: "Preparing script",
    progress: 0,
  });
  await writePendingVideos(pendingVideos);
}

// Update a pending video's status
async function updatePendingVideo(
  scriptId: string,
  step: string,
  progress: number
) {
  const pendingVideos = await readPendingVideos();
  const index = pendingVideos.findIndex((video) => video.id === scriptId);
  if (index !== -1) {
    pendingVideos[index] = {
      ...pendingVideos[index],
      currentStep: step,
      progress,
    };
    await writePendingVideos(pendingVideos);
  }
}

async function removePendingVideo(scriptId: string) {
  let pendingVideos = await readPendingVideos();
  pendingVideos = pendingVideos.filter((video) => video.id !== scriptId);
  await writePendingVideos(pendingVideos);
}

export async function getPendingVideos(): Promise<PendingVideo[]> {
  return await readPendingVideos();
}
