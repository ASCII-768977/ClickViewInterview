import { VideoItem } from '../components/video-item';
import { useState, useEffect } from 'react';

import { Video } from '../interfaces/video';

export function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    let isCancelled = false;
    fetch('./videos.json')
      .then((response) => response.json())
      .then((data) => {
        if (!isCancelled) {
          setVideos(data);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <main>
      <h1>Videos route</h1>
      {videos.map((video) => (
        <VideoItem key={video.id} video={video} />
      ))}
    </main>
  );
}
