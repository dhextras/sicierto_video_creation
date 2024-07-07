import invariant from "tiny-invariant";
import { useEffect, useState } from "react";
import {
  Form,
  json,
  redirect,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

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

  const currentScript = await getScript(params.id);
  const promptText = formData.get("text")?.toString() || currentScript.script;

  await updateScript(params.id, promptText);
  return redirect(`/createVideo/${params.id}`);
};

export default function TextEditor() {
  const fetcher = useFetcher();
  const navigation = useNavigation();
  const [text, setText] = useState("");
  let { generatedScript } = useLoaderData<{
    generatedScript: Script;
  }>();

  useEffect(() => {
    setText(generatedScript.script);
  }, [generatedScript]);

  const handleCreateVideo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetcher.submit(event.currentTarget, {
      method: "post",
      action: `/textEditor/${generatedScript.id}`,
    });
  };

  return (
    <div
      className="flex flex-col items-center h-full"
      style={{ width: "-webkit-fill-available" }}
    >
      <div className="text-2xl mb-4">TextEditor</div>
      <Form onSubmit={handleCreateVideo} className="w-full">
        <textarea
          name="text"
          className="h-96 p-4 border rounded-md w-full"
          placeholder="Your text will be here soon..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          type="submit"
          disabled={navigation.state !== "idle"}
        >
          {navigation.state !== "idle" ? "Loading..." : "Create Video"}
        </button>
      </Form>
    </div>
  );
}
