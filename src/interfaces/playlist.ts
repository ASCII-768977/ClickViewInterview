export interface Playlist {
  id: number;
  name: string;
  description: string;
  videoIds: number[];
  dateCreated: string;
}

export interface PlaylistItemProp {
  playlist: Playlist;
  deletePlaylist: (playlistId: number) => void;
}
