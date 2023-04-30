import { createContext, useEffect, useState, ReactNode } from 'react';
import { Playlist } from './interfaces/playlist';
import { Video } from './interfaces/video';

type State = {
  playlists: Playlist[];
  videos: Video[];
  addPlaylist: (playlist: Playlist) => void;
  deletePlaylist: (playlistId: number) => void;
};

export const Context = createContext<State>({} as State);

type ProviderProps = {
  children: ReactNode;
};

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

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

  useEffect(() => {
    let isCancelled = false;
    fetch(`${process.env.PUBLIC_URL}/playlists.json`)
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setPlaylists(data);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
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
      value={{ playlists, videos, addPlaylist, deletePlaylist }}
    >
      {children}
    </Context.Provider>
  );
};
