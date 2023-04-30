import { VideoItem } from '../components/video-item';
import { useContext, useState } from 'react';
import { Context } from '../context';

import { Playlist } from '../interfaces/playlist';

export function Videos() {
  const {
    playlists,
    videos,
    toggleAddVideos,
    setToggleAddVideos,
    addCheckedVideosToPlaylists,
  } = useContext(Context);

  const [selectedPlaylists, setSelectedPlaylists] = useState<Playlist[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSelect = (e: any) => {
    const selectedId = Number(e.target.value);

    if (!selectedId) {
      return;
    } else {
      const selectedPlaylistIndex = selectedPlaylists.findIndex(
        (playlist) => playlist.id === selectedId
      );

      if (selectedPlaylistIndex !== -1) {
        setSelectedPlaylists((prevSelectedPlaylists) =>
          prevSelectedPlaylists.filter(
            (_, index) => index !== selectedPlaylistIndex
          )
        );
      } else {
        const newSelectedPlaylist = playlists.find(
          (playlist) => playlist.id === selectedId
        );

        if (newSelectedPlaylist) {
          setSelectedPlaylists((prevSelectedPlaylists) => [
            ...prevSelectedPlaylists,
            newSelectedPlaylist,
          ]);
        }
      }
    }
  };

  const handleVideoCheckboxChange = (videoId: number, isChecked: boolean) => {
    setSelectedVideos((prevSelectedVideos) => {
      if (isChecked) {
        return [...prevSelectedVideos, videoId];
      } else {
        return prevSelectedVideos.filter((id) => id !== videoId);
      }
    });
  };

  const handleConfirm = () => {
    if (selectedPlaylists.length === 0) {
      alert('Please select a playlist');
      return;
    } else {
      const selectedPlaylistIds = selectedPlaylists.map(
        (playlist) => playlist.id
      );
      addCheckedVideosToPlaylists(selectedPlaylistIds, selectedVideos);
      setSelectedVideos([]);
      setSelectedPlaylists([]);
      setToggleAddVideos(false);
    }
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <h1>Videos route</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search videos by name"
        className="mb-4 me-4"
      />
      {!toggleAddVideos ? (
        <>
          <button onClick={() => setToggleAddVideos(true)} className="mb-4">
            Add Videos to Playlist
          </button>
          {filteredVideos.map((video) => (
            <VideoItem key={video.id} video={video} />
          ))}
        </>
      ) : (
        <>
          <div style={{ display: 'flex', gap: 50 }} className="mb-4">
            <label htmlFor="select-playlist">
              Select a playlist to be added:
            </label>
            <select id="select-playlist" onChange={handleSelect}>
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option
                  key={playlist.id}
                  value={playlist.id}
                  onClick={() => handleSelect(playlist.id)}
                >
                  {playlist.name}
                </option>
              ))}
            </select>
            <p>You have select:</p>
            {selectedPlaylists.map((playlist) => (
              <span key={playlist.id}>{playlist.name}</span>
            ))}
            <button onClick={handleConfirm}>Confirm</button>
          </div>
          {filteredVideos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              onCheckboxChange={handleVideoCheckboxChange}
              onToggleChecked={toggleAddVideos}
            />
          ))}
        </>
      )}
    </main>
  );
}
