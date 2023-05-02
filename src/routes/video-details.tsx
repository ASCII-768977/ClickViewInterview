import { useParams } from 'react-router-dom';

export function VideoDetails() {
  console.log('VideoDetails');
  const params = useParams();
  return (
    <main>
      <h1>Video Details</h1>
    </main>
  );
}
