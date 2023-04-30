import { render, screen } from '@testing-library/react';
import { Context, Provider } from './context';

describe('Provider component', () => {
  it('renders the provided children', () => {
    render(
      <Provider>
        <div data-testid="test-child">Test child</div>
      </Provider>
    );
    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();
  });

  it('provides the correct initial values to the context', () => {
    render(
      <Provider>
        <Context.Consumer>
          {(value) => {
            expect(value.playlists).toEqual([]);
            expect(value.videos).toEqual([]);
            expect(typeof value.addPlaylist).toBe('function');
            expect(typeof value.deletePlaylist).toBe('function');
            expect(typeof value.addVideoToPlaylist).toBe('function');
            expect(typeof value.removeVideoFromPlaylist).toBe('function');
            expect(value.toggleAddVideos).toBe(false);
            expect(typeof value.setToggleAddVideos).toBe('function');
            expect(typeof value.addCheckedVideosToPlaylists).toBe('function');
            return null;
          }}
        </Context.Consumer>
      </Provider>
    );
  });

});
