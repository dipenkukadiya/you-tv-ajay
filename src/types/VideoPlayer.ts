
export interface IVideoURL {
  url: string;
  quality: number;
  qualityString: string;
};

export interface ISubtitleURL {
  url: string;
  title: string;
};

export interface IVideoPlayerProps {
  videoURLs: [IVideoURL];
  thumbnail?: string | null;
  muted?: boolean;
  subtitles?: [ISubtitleURL] | null;
};