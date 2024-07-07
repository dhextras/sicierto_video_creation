import invariant from "tiny-invariant";
import { json, useLoaderData } from "@remix-run/react";
import { getScript } from "~/db/utils";
import type { Script } from "~/types/db";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, "id must be provided");
  const generatedScript = await getScript(params.id);

  return json({ generatedScript });
};

export default function CreateScriptPopup() {
  const { generatedScript } = useLoaderData<{
    generatedScript: Script;
  }>();
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl">Under construction...</h2>
      <p className="mt-4">{generatedScript.script}</p>
      <p className="mt-4">
        Please wait while we pass it to the chrome extension ( which is not
        developed yet... )
      </p>
    </div>
  );
}
