import { PlaylistItem } from '../components/playlist-item';
import { useContext } from 'react';
import { Context } from '../context';
import toast from 'react-hot-toast';

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

    if (!nameInput.value || !descriptionInput.value) {
      toast.error('Both name and description are required!');

      if (!nameInput.value) {
        nameInput.classList.add('input-error');
      } else {
        nameInput.classList.remove('input-error');
      }

      if (!descriptionInput.value) {
        descriptionInput.classList.add('input-error');
      } else {
        descriptionInput.classList.remove('input-error');
      }
      return;
    }

    const newPlaylist: Playlist = {
      id: playlists.length + 1,
      name: nameInput.value,
      description: descriptionInput.value,
      videoIds: [],
      dateCreated: new Date().toISOString(),
    };

    addPlaylist(newPlaylist);
    form.reset();
    toast.success('Playlist added successfully!');
  };
  return (
    <main>
      <h1>Playlists Route</h1>
      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          playlist={playlist}
          deletePlaylist={deletePlaylist}
        />
      ))}

      <h2 style={{ marginTop: '5rem' }}>Add new playlist</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="playlist-name" className="form-label">
          Enter your playlist name
        </label>
        <div className="input-group mb-3">
          <input
            id="playlist-name"
            type="text"
            name="name"
            className="form-control"
            placeholder="Please write down playlist name"
          />
        </div>

        <label htmlFor="playlist-description" className="form-label">
          Enter your playlist description
        </label>
        <div className="input-group mb-3">
          <input
            id="playlist-description"
            type="text"
            name="description"
            className="form-control"
            placeholder="Please write down playlist description"
          />
        </div>
        <button type="submit" className="btn-basic btn-bd-primary mb-4">
          Add playlist
        </button>
      </form>
    </main>
  );
}
