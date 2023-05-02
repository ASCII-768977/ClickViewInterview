import { createContext, useEffect, useState, ReactNode } from 'react';
import { Playlist } from './interfaces/playlist';
import { Video } from './interfaces/video';

type State = {
  playlists: Playlist[];
  videos: Video[];
  addPlaylist: (playlist: Playlist) => void;
  deletePlaylist: (playlistId: number) => void;
  addVideoToPlaylist: (playlistId: number, videoId: number) => void;
  removeVideoFromPlaylist: (playlistId: number, videoId: number) => void;
  toggleAddVideos: boolean;
  setToggleAddVideos: (toggle: boolean) => void;
  addCheckedVideosToPlaylists: (
    selectedPlaylistIds: number[],
    selectedVideoIds: number[]
  ) => void;
};

export const Context = createContext<State>({} as State);

type ProviderProp = {
  children: ReactNode;
};

export const Provider: React.FC<ProviderProp> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [toggleAddVideos, setToggleAddVideos] = useState<boolean>(false);

  const addPlaylist = (playlist: Playlist) => {
    setPlaylists([...playlists, playlist]);
  };

  const deletePlaylist = (playlistId: number) => {
    const removePlaylistIndex = playlists.findIndex(
      (playlist) => playlist.id === playlistId
    );
    const newPlaylist = [...playlists];
    newPlaylist.splice(removePlaylistIndex, 1);
    if (removePlaylistIndex !== -1) {
      setPlaylists(newPlaylist);
    }
  };

  const addVideoToPlaylist = (playlistId: number, videoId: number) => {
    const selectedPlaylist = playlists.find(
      (playlist) => playlist.id === playlistId
    );
    const selectedPlaylistIndex = playlists.findIndex(
      (playlist) => playlist.id === playlistId
    );
    if (selectedPlaylist) {
      selectedPlaylist.videoIds.push(videoId);
      const newPlaylists = [...playlists];
      newPlaylists[selectedPlaylistIndex] = selectedPlaylist;
      setPlaylists(newPlaylists);
    }
  };

const addCheckedVideosToPlaylists = (
  selectedPlaylistIds: number[],
  selectedVideoIds: number[]
) => {
  const updatedPlaylists = playlists.map((playlist) => {
    if (selectedPlaylistIds.includes(playlist.id)) {
      const updatedVideoIds = new Set([
        ...playlist.videoIds,
        ...selectedVideoIds,
      ]);
      return {
        ...playlist,
        videoIds: Array.from(updatedVideoIds),
      };
    } else {
      return playlist;
    }
  });
  setPlaylists(updatedPlaylists);
};

  const removeVideoFromPlaylist = (playlistId: number, videoId: number) => {
    const selectedPlaylist = playlists.find(
      (playlist) => playlist.id === playlistId
    );
    const selectedPlaylistIndex = playlists.findIndex(
      (playlist) => playlist.id === playlistId
    );

    if (selectedPlaylist) {
      const newVideoIds = selectedPlaylist.videoIds.filter(
        (id) => id !== videoId
      );
      const newPlaylists = [...playlists];
      newPlaylists[selectedPlaylistIndex] = {
        ...selectedPlaylist,
        videoIds: newVideoIds,
      };
      setPlaylists(newPlaylists);
    }
  };

  useEffect(() => {
    let isCancelled = false;
    fetch(`${process.env.PUBLIC_URL}/playlists.json`)
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setPlaylists(data);
        }
      });
    fetch(`${process.env.PUBLIC_URL}/videos.json`)
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setVideos(data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <Context.Provider
      value={{
        playlists,
        videos,
        addPlaylist,
        deletePlaylist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        toggleAddVideos,
        setToggleAddVideos,
        addCheckedVideosToPlaylists,
      }}
    >
      {children}
    </Context.Provider>
  );
};
