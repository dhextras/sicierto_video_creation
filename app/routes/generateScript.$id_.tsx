import invariant from "tiny-invariant";
import {
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";

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
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Edit Script</h2>
      </div>

      <p>{generatedScript.script}</p>
      <div className="flex justify-between">
        <button
          onClick={() => handleCreateVideo(generatedScript.id)}
          style={{ marginTop: "10px" }}
        >
          Create Video
        </button>
        <button
          onClick={() => handleEditScript(generatedScript.id)}
          style={{ marginTop: "10px" }}
        >
          Edit Script
        </button>
        <button onClick={handleDeleteScript} style={{ marginTop: "10px" }}>
          delete Script
        </button>
      </div>
    </div>
  );
}
