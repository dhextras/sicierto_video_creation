import { PendingVideo } from "~/types/db";

export default function PendingVideoItem({
  id,
  currentStep,
  progress,
}: PendingVideo) {
  return (
    <div className="flex flex-row border-2 border-black rounded-lg p-4 mb-4 justify-between items-center">
      <span className="font-bold">ID: {id}</span>
      <span>{currentStep}</span>
      <div className="w-[300px] bg-gray-300 rounded-full h-2.5 ">
        <div
          className="bg-green-400 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
