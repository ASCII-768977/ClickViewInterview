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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

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

  const handleItemsPerPageChange = (e: any) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  const filteredVideos = videos.filter((video) =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredVideos.length / itemsPerPage);

  const paginatedVideos = filteredVideos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };
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
          <button
            type="button"
            onClick={() => setToggleAddVideos(true)}
            className="mb-4"
          >
            Add Videos to Playlist
          </button>
          {paginatedVideos.map((video) => (
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
            <button type="button" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
          {paginatedVideos.map((video) => (
            <VideoItem
              key={video.id}
              video={video}
              onCheckboxChange={handleVideoCheckboxChange}
              onToggleChecked={toggleAddVideos}
            />
          ))}
        </>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div>
          <button
            type="button"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {pageCount}
          </span>
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            Next
          </button>
          <button
            type="button"
            onClick={() => goToPage(pageCount)}
            disabled={currentPage === pageCount}
          >
            Last
          </button>
        </div>
        <select
          id="select-pagination"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={15}>15 items per page</option>
        </select>
      </div>
    </main>
  );
}
