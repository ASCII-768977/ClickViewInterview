export interface Video {
  id: number;
  name: string;
  duration: number;
  description: string;
  dateCreated: string;
  thumbnail: string;
}

export interface VideoItemProp {
  video: Video;
  onClick?: () => void;
  onCheckboxChange?: (videoId: number, isChecked: boolean) => void;
  onToggleChecked?: boolean;
}
