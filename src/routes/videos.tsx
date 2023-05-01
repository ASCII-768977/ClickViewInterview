import { VideoItem } from '../components/video-item';
import {
  useContext,
  useState,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
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
  const [sortConfig, setSortConfig] = useState<{
    property: keyof (typeof videos)[0];
    order: 'asc' | 'desc';
  }>({
    property: 'name',
    order: 'asc',
  });

  const filteredVideos = useMemo(() => {
    const sortedVideos = [...videos].sort((a, b) => {
      if (a[sortConfig.property] < b[sortConfig.property]) {
        return sortConfig.order === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.property] > b[sortConfig.property]) {
        return sortConfig.order === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortedVideos.filter((video) =>
      video.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [videos, debouncedSearchTerm, sortConfig]);

  const {
    currentPage,
    itemsPerPage,
    pageCount,
    paginatedItems: paginatedVideos,
    setCurrentPage,
    setItemsPerPage,
    goToPage,
  } = usePagination(filteredVideos);

  const handleSelectedPlaylistsChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
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
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    },
    [setCurrentPage]
  );

  const handleItemsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(parseInt(e.target.value));
      setCurrentPage(1);
    },
    [setCurrentPage, setItemsPerPage]
  );

  const handleSort = useCallback(
    (property: keyof (typeof videos)[0], order: 'asc' | 'desc') => {
      setSortConfig({ property, order });
    },
    []
  );

  const handleSelectedSortChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const [property, order] = e.target.value.split('-') as [
        keyof (typeof videos)[0],
        'asc' | 'desc'
      ];
      handleSort(property, order);
    },
    [handleSort]
  );

  return (
    <main>
      <h1>Videos route</h1>
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}
        className="mb-4"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search videos by name"
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label htmlFor="sort-videos">Sort by:</label>
          <select
            id="sort-videos"
            value={`${sortConfig.property}-${sortConfig.order}`}
            onChange={handleSelectedSortChange}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="duration-asc">Duration (shortest-longest)</option>
            <option value="duration-desc">Duration (longest-shortest)</option>
            <option value="dateCreated-asc">
              Date created (oldest-newest)
            </option>
            <option value="dateCreated-desc">
              Date created (newest-oldest)
            </option>
          </select>
        </div>
      </div>
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
          <div style={{ display: 'flex', gap: 20 }} className="mb-4">
            <label htmlFor="select-playlist">
              Select a playlist to be added:
            </label>
            <select
              id="select-playlist"
              onChange={handleSelectedPlaylistsChange}
            >
              <option value="">Select a playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
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
            <button type="button" onClick={() => setToggleAddVideos(false)}>
              Cancel
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
          aria-label="pagination dropdown"
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
