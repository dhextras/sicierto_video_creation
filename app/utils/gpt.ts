import { writeFile as nodeWriteFile } from "node:fs/promises";
export const writeFile = nodeWriteFile;

import { getScripts } from "~/db/utils";

import { Script } from "~/types/db";

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
