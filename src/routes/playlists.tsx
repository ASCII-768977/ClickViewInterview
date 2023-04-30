import { PlaylistItem } from '../components/playlist-item';
import { useState, useEffect } from 'react';

import { Playlist } from '../interfaces/playlist';

export function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    let isCancelled = false;
    fetch('./playlists.json')
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

  return (
    <main>
      <h1>Playlists route</h1>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </main>
  );
}
