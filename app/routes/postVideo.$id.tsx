import { useEffect, useState } from "react";
import {
  useLoaderData,
  useActionData,
  Form,
  useNavigation,
  useNavigate,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getVideo } from "~/db/utils";
import { uploadToYouTube } from "~/utils/youtube";
import type { Video } from "~/types/db";

export const loader: LoaderFunction = async ({ params }) => {
  const video = await getVideo(params.id as string);
  return json(video);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const video = JSON.parse(formData.get("video") as string) as Video;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim());

  const result = await uploadToYouTube({ ...video, title, description, tags });
  console.log(result, "somethign");
  return json(result);
};

export default function PostVideo() {
  const video = useLoaderData<Video>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const actionData = useActionData<{ success: boolean; url: string }>();
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (actionData?.success) {
      console.log(
        "video Posted successfully this should become a notification"
      );
      //   navigate("/");
    } else if (actionData?.success === false) {
      console.log("Failed to post video also becomes a notification");
    }
  }, [actionData?.success]);

  return (
    <div className="flex flex-col w-full items-center justify-center px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Post Video to YouTube</h1>
      <img
        className="mb-4"
        src={video.thumbnail}
        alt={video.title}
        width="200"
      />
      <Form method="post" className="w-full">
        <input type="hidden" name="video" value={JSON.stringify(video)} />
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700">
            Tags (comma-separated):
          </label>
          <input
            className="w-full px-3 py-2 rounded ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={navigation.state !== "idle"}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            navigation.state !== "idle" ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {navigation.state !== "idle" ? "Uploading..." : "Upload to YouTube"}
        </button>
      </Form>
    </div>
  );
}
