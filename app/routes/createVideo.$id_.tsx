import { json, redirect, useFetcher, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import { getScript } from "~/db/utils";
import { sendToExtension } from "~/utils/extension";
import { Script } from "~/types/db";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");
  const generatedScript = await getScript(params.id);
  return json({ generatedScript });
};

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.id, "id must be provided");
  const script = await getScript(params.id);
  const success = await sendToExtension(script);

  if (success) {
    return redirect("/queue");
  } else {
    return json({ success: false });
  }
};

export default function CreateVideo() {
  const fetcher = useFetcher();
  const { generatedScript } = useLoaderData<{ generatedScript: Script }>();

  useEffect(() => {
    if (
      fetcher.data &&
      typeof fetcher.data === "object" &&
      "success" in fetcher.data &&
      typeof fetcher.data.success === "boolean"
    ) {
      if (!fetcher.data.success && fetcher.state === "idle") {
        alert("Failed to connect with the extension");
      }
    }
  }, [fetcher.state, fetcher.data]);

  const handleSendToExtension = () => {
    fetcher.submit(null, { method: "post" });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl mb-4">Creating Video from Script</h1>
      <p className="mb-4">{generatedScript.script}</p>
      {fetcher.state !== "idle" && (
        <p className="text-gray-500">Sending script to extension...</p>
      )}

      <button
        onClick={handleSendToExtension}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ${
          fetcher.state !== "idle"
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-blue-700"
        }`}
        disabled={fetcher.state !== "idle"}
      >
        {fetcher.state !== "idle" ? "Connecting..." : "Create video"}
      </button>
    </div>
  );
}
