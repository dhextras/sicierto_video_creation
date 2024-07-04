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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Genrate Prompt</h2>
      </div>
      <div>
        <label htmlFor="prompt-select">Prompt:</label>
        <select
          id="prompt-select"
          value={selectedPrompt?.id || ""}
          onChange={(e) =>
            handlePromptSelect(
              SCRIPT_PROMPTS.find((prompt) => prompt.id === e.target.value) ||
                null
            )
          }
        >
          <option value="">Select a prompt</option>
          {SCRIPT_PROMPTS.map((prompt) => (
            <option key={prompt.id} value={prompt.id}>
              {prompt.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          style={{ width: "100%", height: "150px" }}
        />
        <button onClick={handleCreateScript} style={{ marginTop: "10px" }}>
          Create Script
        </button>
      </div>
    </div>
  );
}
