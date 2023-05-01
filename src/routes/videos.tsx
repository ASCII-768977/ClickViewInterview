import { VideoItem } from '../components/video-item';
import { useContext, useState, useCallback, useMemo } from 'react';
import { Context } from '../context';
import { useDebounce, usePagination } from '../hooks';
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
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) =>
      video.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [videos, debouncedSearchTerm]);

  const {
    currentPage,
    itemsPerPage,
    pageCount,
    paginatedItems: paginatedVideos,
    setCurrentPage,
    setItemsPerPage,
    goToPage,
  } = usePagination(filteredVideos);

  const handleSelect = useCallback(
    (e: any) => {
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
    },
    [selectedPlaylists, playlists]
  );

  const handleVideoCheckboxChange = useCallback(
    (videoId: number, isChecked: boolean) => {
      setSelectedVideos((prevSelectedVideos) => {
        if (isChecked) {
          return [...prevSelectedVideos, videoId];
        } else {
          return prevSelectedVideos.filter((id) => id !== videoId);
        }
      });
    },
    []
  );

  const handleConfirm = useCallback(() => {
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
  }, [
    selectedPlaylists,
    selectedVideos,
    addCheckedVideosToPlaylists,
    setToggleAddVideos,
  ]);

  const handleSearchChange = useCallback(
    (e: any) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    },
    [setCurrentPage]
  );

  const handleItemsPerPageChange = useCallback(
    (e: any) => {
      setItemsPerPage(parseInt(e.target.value));
      setCurrentPage(1);
    },
    [setCurrentPage, setItemsPerPage]
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
