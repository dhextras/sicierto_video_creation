import { useState } from "react";
import { json, redirect, useFetcher, useLoaderData } from "@remix-run/react";

import { createScript, getPrompts } from "~/db/utils";

import { ScriptPrompt } from "~/types/db";
import { ActionFunctionArgs } from "@remix-run/node";

export const loader = async () => {
  const SCRIPT_PROMPTS = await getPrompts();

  return json({ SCRIPT_PROMPTS });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "create_script") {
    const promptText = formData.get("promptText")?.toString() || "";
    const newScritpt = await createScript(promptText);

    return redirect(`/generateScript/${newScritpt.id}`);
  }
};

export default function CreateScriptPopup() {
  const fetcher = useFetcher();
  const { SCRIPT_PROMPTS } = useLoaderData<{
    SCRIPT_PROMPTS: ScriptPrompt[];
  }>();

  const [promptText, setPromptText] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<ScriptPrompt | null>(
    null
  );

  const handlePromptSelect = (prompt: ScriptPrompt | null) => {
    if (prompt) {
      setSelectedPrompt(prompt);
      setPromptText(prompt.prompt);
    } else {
      setSelectedPrompt(null);
      setPromptText("");
    }
  };

  const handleCreateScript = () => {
    fetcher.submit({ action: "create_script", promptText }, { method: "post" });
  };

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Generate Prompt</h2>
      </div>
      <div className="mt-4 w-full">
        <label
          htmlFor="prompt-select"
          className="block font-medium text-gray-700"
        >
          Prompt:
        </label>
        <select
          id="prompt-select"
          value={selectedPrompt?.id || ""}
          onChange={(e) =>
            handlePromptSelect(
              SCRIPT_PROMPTS.find((prompt) => prompt.id === e.target.value) ||
                null
            )
          }
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="">Select a prompt</option>
          {SCRIPT_PROMPTS.map((prompt) => (
            <option key={prompt.id} value={prompt.id}>
              {prompt.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 w-full">
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          style={{ height: "150px" }}
        />
        <button
          onClick={handleCreateScript}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Script
        </button>
      </div>
    </div>
  );
}
