import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Context, Provider } from './context';
import React from 'react';

//Given Test Component
const TestComponent: React.FC = () => {
  const {
    playlists,
    videos,
    addPlaylist,
    deletePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    toggleAddVideos,
    setToggleAddVideos,
    addCheckedVideosToPlaylists,
  } = React.useContext(Context);

  return (
    <div>
      <button
        onClick={() =>
          addPlaylist({
            id: 1,
            name: 'New Playlist',
            videoIds: [],
            description: 'abc',
            dateCreated: '2021-01-15T18:20:32',
          })
        }
      >
        Add Playlist
      </button>
      <button onClick={() => deletePlaylist(1)}>Delete Playlist</button>
      <button onClick={() => addVideoToPlaylist(1, 1)}>
        Add Video to Playlist
      </button>
      <button onClick={() => removeVideoFromPlaylist(1, 1)}>
        Remove Video from Playlist
      </button>
      <button onClick={() => setToggleAddVideos(!toggleAddVideos)}>
        Toggle Add Videos
      </button>
      <button onClick={() => addCheckedVideosToPlaylists([1], [1])}>
        Add Checked Videos to Playlists
      </button>
      <div data-testid="playlists">{JSON.stringify(playlists)}</div>
      <div data-testid="videos">{JSON.stringify(videos)}</div>
      <div data-testid="toggleAddVideos">{JSON.stringify(toggleAddVideos)}</div>
    </div>
  );
};

describe('Context', () => {

  it('should add a playlist', () => {
    // Given
     render(
       <Provider>
         <TestComponent />
       </Provider>
     );
    // When
    fireEvent.click(screen.getByText('Add Playlist'));
    // Then
    expect(screen.getByTestId('playlists')).toHaveTextContent('New Playlist');
  });

  it('should delete a playlist', async () => {
    // Given
     render(
       <Provider>
         <TestComponent />
       </Provider>
     );
    // When
    fireEvent.click(screen.getByText('Add Playlist'));
    fireEvent.click(screen.getByText('Delete Playlist'));
    // Then
    await waitFor(() =>
      expect(screen.getByTestId('playlists')).not.toHaveTextContent(
        'New Playlist'
      )
    );
  });

  it('should add video to playlist', async () => {
    // Given
     render(
       <Provider>
         <TestComponent />
       </Provider>
     );
     // When
    fireEvent.click(screen.getByText('Add Playlist'));
    fireEvent.click(screen.getByText('Add Video to Playlist'));
    // Then
    await waitFor(() =>
      expect(screen.getByTestId('playlists')).toHaveTextContent(
        '"videoIds":[1]'
      )
    );
  });

  it('should remove video from playlist', async () => {
    // Given
     render(
       <Provider>
         <TestComponent />
       </Provider>
     );
    // When
    fireEvent.click(screen.getByText('Add Playlist'));
    fireEvent.click(screen.getByText('Add Video to Playlist'));
    fireEvent.click(screen.getByText('Remove Video from Playlist'));
    // Then
    await waitFor(() =>
      expect(screen.getByTestId('playlists')).toHaveTextContent('"videoIds":[]')
    );
  });

  it('should toggle add videos', () => {
    // Given
     render(
       <Provider>
         <TestComponent />
       </Provider>
     );
    // When
    fireEvent.click(screen.getByText('Toggle Add Videos'));
    // Then
    expect(screen.getByTestId('toggleAddVideos')).toHaveTextContent('true');
  });

  it('should add checked videos to playlists', async () => {
    // Given
     render(
       <Provider>
         <TestComponent />
       </Provider>
     );
    // When
    fireEvent.click(screen.getByText('Add Playlist'));
    fireEvent.click(screen.getByText('Add Checked Videos to Playlists'));
    // Then
    await waitFor(() =>
      expect(screen.getByTestId('playlists')).toHaveTextContent(
        '"videoIds":[1]'
      )
    );
  });
});
