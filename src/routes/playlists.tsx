import { PlaylistItem } from '../components/playlist-item';
import { useContext } from 'react';
import { Context } from '../context';

import { Playlist } from '../interfaces/playlist';

export function Playlists() {
  const { playlists, addPlaylist, deletePlaylist } = useContext(Context);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    const descriptionInput = form.elements.namedItem(
      'description'
    ) as HTMLInputElement;

    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name: nameInput.value,
      description: descriptionInput.value,
      videoIds: [],
      dateCreated: new Date().toISOString(),
    };

    addPlaylist(newPlaylist);
    form.reset();
  };
  return (
    <main>
      <h1>Playlists route</h1>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          playlist={playlist}
          deletePlaylist={deletePlaylist}
        />
      ))}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="name" />
        <input type="text" name="description" placeholder="description" />
        <button type="submit">Add play list</button>
      </form>
    </main>
  );
}
