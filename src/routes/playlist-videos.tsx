import { useParams } from 'react-router-dom';
import { VideoItem } from '../components/video-item';
import { useContext, MouseEvent } from 'react';

import { Context } from '../context';
import { AddVideoItem } from '../components/add-video-item';

export function PlaylistVideos() {
  const params = useParams();
  const { playlists, videos, addVideoToPlaylist, removeVideoFromPlaylist } =
    useContext(Context);

  const playlist = playlists.find(
    (playlist) => playlist.id === Number(params.playlistId)
  );

  const playlistVideos =
    playlist?.videoIds.map((videoId) => {
      return videos.find((video) => video.id === videoId);
    }) || [];

  const addableVideos = videos.filter((vid) => !playlistVideos.includes(vid));

  if (!playlist) {
    return <h1>Playlist not found</h1>;
  }

  return (
    <main>
      <h1>Videos for {playlist!.name}</h1>
      {playlistVideos && playlistVideos.length === 0 ? (
        <h2>Play list is empty, let's add some videos~</h2>
      ) : (
        playlistVideos.map((video) => (
          <VideoItem
            key={video?.id}
            video={video!}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              removeVideoFromPlaylist(playlist.id, video!.id);
            }}
          />
        ))
      )}
      <hr />
      <h3>Click below to add a video to the playlist!</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {addableVideos.map((video) => (
          <AddVideoItem
            key={video.id}
            thumbnail={video.thumbnail}
            name={video.name}
            onClick={() => addVideoToPlaylist(playlist.id, video.id)}
          />
        ))}
      </div>
    </main>
  );
}
