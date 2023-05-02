import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

class MockResizeObserver {
  observe() {
    // Do nothing
  }

  unobserve() {
    // Do nothing
  }

  disconnect() {
    // Do nothing
  }
}

window.ResizeObserver = MockResizeObserver;

describe('Given App render', () => {
  it('renders Layout component', () => {
    // Given
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    // When
    const layoutElement = screen.getByRole('navigation');

    // Then
    expect(layoutElement).toBeInTheDocument();
  });

  it('navigates to Playlists by default', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // When
    const playlistsHeading = screen.getByRole('heading', {
      name: 'Welcome to ClickView',
    });

    // Then
    expect(playlistsHeading).toBeInTheDocument();
  });

  it('renders PlaylistVideos component when playlist id is provided', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/playlists/1']}>
        <App />
      </MemoryRouter>
    );

    // When
    const playlistVideosHeading = screen.getByRole('heading', {
      name: /playlist not found/i,
    });

    // Then
    expect(playlistVideosHeading).toBeInTheDocument();
  });

  it('renders Videos component', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/videos']}>
        <App />
      </MemoryRouter>
    );

    // When
    const videosHeading = screen.getByRole('heading', { name: /videos/i });

    // Then
    expect(videosHeading).toBeInTheDocument();
  });

  it('renders NotFound component for non-existent routes', () => {
    // Given
    render(
      <MemoryRouter initialEntries={['/non-existent-route']}>
        <App />
      </MemoryRouter>
    );

    // When
    const notFoundText = screen.getByRole('heading', {
      name: /404 not found/i,
    });

    // Then
    expect(notFoundText).toBeInTheDocument();
  });
});
