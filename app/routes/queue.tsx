import { useState, useEffect } from "react";
import PendingVideoItem from "~/components/PendingVideoItem";
import { PendingVideo } from "~/types/db";

const initialPendingVideos: PendingVideo[] = [
  { id: "123321312", currentStep: "Preparing script", progress: 0 },
  { id: "132113162", currentStep: "Preparing script", progress: 0 },
  { id: "132131312", currentStep: "Preparing script", progress: 0 },
  { id: "124321321", currentStep: "Preparing script", progress: 0 },
  { id: "125312312", currentStep: "Preparing script", progress: 0 },
];

export default function Queue() {
  const [pendingVideos, setPendingVideos] =
    useState<PendingVideo[]>(initialPendingVideos);

  const listenToExtensionUpdates = (
    scriptId: string,
    onUpdate: (step: string, progress: number) => void
  ): (() => void) => {
    const steps = [
      "Preparing script",
      "Generating video content",
      "Adding voiceover",
      "Applying visual effects",
      "Finalizing video",
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const progress = ((currentStep + 1) / steps.length) * 100;
        onUpdate(steps[currentStep], progress);
        currentStep++;
      } else {
        clearInterval(interval);
        onUpdate("Complete", 100);
      }
    }, Math.floor(Math.random() * 3 + 1) * 1000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const listeners = pendingVideos.map((video) =>
      listenToExtensionUpdates(video.id, (step, progress) => {
        setPendingVideos((prevVideos) =>
          prevVideos.map((v) =>
            v.id === video.id ? { ...v, currentStep: step, progress } : v
          )
        );
      })
    );

    return () => listeners.forEach((stopListening) => stopListening());
  }, []);

  return (
    <div className="w-full  p-4">
      <h1 className="text-2xl mb-4">Video Queue</h1>
      {pendingVideos.map((video) => (
        <PendingVideoItem
          key={video.id}
          id={video.id}
          currentStep={video.currentStep}
          progress={video.progress}
        />
      ))}
    </div>
  );
}
