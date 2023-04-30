import { useParams } from 'react-router-dom';
import { VideoItem } from '../components/video-item';

import { Video } from '../interfaces/video';

import { useContext } from 'react';

import { Context } from '../context';
import { Playlist } from '../interfaces/playlist';

export function PlaylistVideos() {
  const params = useParams();
  const value = useContext(Context);

  const playlist = value.playlists.find(
    (playlist) => playlist.id === Number(params.id)
  );

  const videos =
    playlist?.videoIds.map((videoId) => {
      return value.videos.find((video) => video.id === videoId);
    }) || [];

  console.log(videos);

  return (
    <main>
      <h1>Playlist route for playlist id: {params.id}</h1>
      {videos &&
        videos.map((video) => <VideoItem key={video?.id} video={video!} />)}
    </main>
  );
}
