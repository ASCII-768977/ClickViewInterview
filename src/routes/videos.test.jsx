import { render, screen } from '@testing-library/react';
import { Context } from '../context';
import { Videos } from './videos';

describe('Given mock context, playlist, videos', () => {
  const mockPlaylists = [
    { id: 1, name: 'Playlist 1', videoIds: [] },
    { id: 2, name: 'Playlist 2', videoIds: [] },
  ];

  const mockVideos = [
    { id: 1, name: 'Video 1', duration: 120, dateCreated: '2023-01-01' },
    { id: 2, name: 'Video 2', duration: 240, dateCreated: '2023-02-01' },
  ];

  const mockContext = {
    playlists: mockPlaylists,
    videos: mockVideos,
    toggleAddVideos: false,
    setToggleAddVideos: jest.fn(() => {
    mockContext.toggleAddVideos = true;
  }),    
  addCheckedVideosToPlaylists: jest.fn(),
  };

  it('When render Videos component, with mockVideos', () => {
    render(
      <Context.Provider value={mockContext}>
        <Videos />
      </Context.Provider>
    );

    // Then it should display a list of videos, check heading
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Video 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Video 2' })).toBeInTheDocument();

  });

  it('When render Videos component, toggleAddVideo is false, check conditional rendering', () => {
    render(
      <Context.Provider value={mockContext}>
        <Videos />
      </Context.Provider>
    );
    
    // Then is should render add videos
    expect(screen.queryByText('Select a playlist to be added:')).not.toBeInTheDocument();
    expect(screen.queryByText('You have select:')).not.toBeInTheDocument();
    });
});
