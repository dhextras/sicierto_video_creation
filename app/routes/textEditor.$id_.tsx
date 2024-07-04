import invariant from "tiny-invariant";
import { useEffect, useState } from "react";
import { redirect, useFetcher, useLoaderData, json } from "@remix-run/react";

import { getScript, updateScript } from "~/db/utils";

import type { Script } from "~/types/db";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");
  const generatedScript = await getScript(params.id);

  return json({ generatedScript });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.id, "id must be provided");
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "update_script") {
    const currentScript = await getScript(params.id);
    const promptText = formData.get("text")?.toString() || currentScript.script;

    await updateScript(params.id, promptText);

    return redirect(`/createVideo/${params.id}`);
  }
};

export default function TextEditor() {
  const fetcher = useFetcher();
  const [text, setText] = useState("");
  let { generatedScript } = useLoaderData<{
    generatedScript: Script;
  }>();

  useEffect(() => {
    setText(generatedScript.script);
  }, [generatedScript]);

  const handleCreateVideo = () => {
    fetcher.submit({ action: "update_script", text: text }, { method: "post" });
  };

  return (
    <div className="flex flex-col w-full">
      <div>TextEditor</div>
      <textarea
        style={{ width: "90%", height: "350px" }}
        placeholder="Your text will be here soon..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleCreateVideo}>Create Video</button>
    </div>
  );
}
