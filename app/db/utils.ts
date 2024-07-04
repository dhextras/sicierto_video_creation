import { redirect } from "@remix-run/react";
import {
  readFile as nodeReadFile,
  writeFile as nodeWriteFile,
} from "node:fs/promises";
export const readFile = nodeReadFile;
export const writeFile = nodeWriteFile;

import type { Script, ScriptPrompt, Video } from "~/types/db";

// Video related db funcitons
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

// Video related db funcitons
export async function getPrompts(): Promise<ScriptPrompt[]> {
  const filePath = "app/db/prompts.json";
  const prompts = await readFile(filePath, "utf8").then((data) =>
    JSON.parse(data)
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return prompts as ScriptPrompt[];
}

// Functions that Havent been used yet (To be used in the future in /CreatePrompt route)
// export async function createPrompt(
//   title: string,
//   prompt: string
// ): Promise<ScriptPrompt[]> {
//   const prompts = await getPrompts();
//   const newPrompt: ScriptPrompt = { id: Date.now().toString(), title, prompt };
//   prompts.push(newPrompt);

//   await writeFile("app/db/prompts.json", JSON.stringify(prompts, null, 2));

//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   return prompts as ScriptPrompt[];
// }

// export async function updatePrompt(
//   id: string,
//   title: string,
//   prompt: string
// ): Promise<ScriptPrompt[]> {
//   const prompts = await getPrompts();
//   const index = prompts.findIndex((prompt) => prompt.id === id);
//   prompts[index] = { id, title, prompt };

//   await writeFile("app/db/prompts.json", JSON.stringify(prompts, null, 2));
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   return prompts as ScriptPrompt[];
// }

// export async function deletePrompt(promptId: string): Promise<ScriptPrompt[]> {
//   const prompts = await getPrompts();
//   const filteredPrompts = prompts.filter((prompt) => prompt.id !== promptId);

//   await writeFile(
//     "app/db/prompts.json",
//     JSON.stringify(filteredPrompts, null, 2)
//   );

//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   return filteredPrompts;
// }

//Script related functions
async function getScripts(): Promise<Script[]> {
  const filePath = "app/db/scripts.json";
  const scripts = await readFile(filePath, "utf8").then((data) =>
    JSON.parse(data)
  );

  return scripts as Script[];
}
export async function createScript(promptText: string): Promise<Script> {
  const scripts = await getScripts();

  const newScript = {
    id: Date.now().toString(),
    script:
      "Custom Response: This is a sample script generated based on the provided prompt text. instead generating it from chatgpt" +
      "\nUSER PROMPT: " +
      promptText,
  };

  scripts.push(newScript);
  await writeFile("app/db/scripts.json", JSON.stringify(scripts, null, 2));

  return newScript as Script;
}

export async function getScript(id: string): Promise<Script> {
  const scripts = await getScripts();
  const script = scripts.find((script) => script.id === id);

  if (!script) {
    throw redirect("/createPrompt");
  }

  return script as Script;
}

export async function updateScript(
  id: string,
  script: string
): Promise<Script> {
  const scripts = await getScripts();
  const index = scripts.findIndex((script) => script.id === id);

  scripts[index].script = script;
  await writeFile("app/db/scripts.json", JSON.stringify(scripts, null, 2));

  return scripts[index];
}

export async function deleteScript(id: string): Promise<boolean> {
  const scripts = await getScripts();
  const filteredScripts = scripts.filter((script) => script.id !== id);

  await writeFile(
    "app/db/scripts.json",
    JSON.stringify(filteredScripts, null, 2)
  );

  return true;
}
