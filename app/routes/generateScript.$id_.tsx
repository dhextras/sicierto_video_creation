import invariant from "tiny-invariant";
import { json, redirect, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { deleteScript, getScript } from "~/db/utils";
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

  if (action === "delete_script") {
    await deleteScript(params.id);
    return redirect("/createPrompt");
  }
};

export default function CreateScriptPopup() {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const { generatedScript } = useLoaderData<{
    generatedScript: Script;
  }>();

  const handleCreateVideo = (id: string) => {
    navigate(`/createVideo/${id}`);
  };

  const handleEditScript = (id: string) => {
    navigate(`/textEditor/${id}`);
  };

  const handleDeleteScript = () => {
    fetcher.submit({ action: "delete_script" }, { method: "post" });
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Edit Script</h2>
      <p className="mt-4">{generatedScript.script}</p>
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleCreateVideo(generatedScript.id)}
        >
          Create Video
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={() => handleEditScript(generatedScript.id)}
        >
          Edit Script
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
          onClick={handleDeleteScript}
        >
          Delete Script
        </button>
      </div>
    </div>
  );
}

