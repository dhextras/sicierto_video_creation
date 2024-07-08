export type Video = {
  id: string;
  thumbnail: string;
  title: string;
  file: string;
};

export type ScriptPrompt = {
  id: string;
  title: string;
  prompt: string;
};

export type Script = {
  id: string;
  script: string;
};

export type PendingVideo = {
  id: string;
  currentStep: string;
  progress: number;
};
