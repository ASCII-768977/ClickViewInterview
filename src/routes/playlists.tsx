import { PlaylistItem } from '../components/playlist-item';
import { useContext } from 'react';
import { Context } from '../context';

import { Playlist } from '../interfaces/playlist';

export function Playlists() {
  const { playlists, addPlaylist } = useContext(Context);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const descriptionInput = form.elements.namedItem(
      'description'
    ) as HTMLInputElement;
    const videoIdInput = form.elements.namedItem('videoId') as HTMLInputElement;

    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name: nameInput.value,
      description: descriptionInput.value,
      videoIds: [Number(videoIdInput.value)],
      dateCreated: new Date().toISOString(),
    };

    addPlaylist(newPlaylist);

    form.reset();
  };
  return (
    <main>
      <h1>Playlists route</h1>
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="description" />
        <input type="number" placeholder="videoId" />
        <button type="submit">Add play list</button>
      </form>
    </main>
  );
}
