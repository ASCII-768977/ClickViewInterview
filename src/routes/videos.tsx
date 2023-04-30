import { VideoItem } from '../components/video-item';
import { useContext } from 'react';
import { Context } from '../context';

export function Videos() {
  const { videos } = useContext(Context);

  return (
    <main>
      <h1>Videos route</h1>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </main>
  );
}
