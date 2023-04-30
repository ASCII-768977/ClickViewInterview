import { useParams } from 'react-router-dom'

export function PlaylistVideos() {
  const params = useParams();

  return (
    <main>
      <h1>Playlist route for playlist id: {params.id}</h1>
    </main>
  )
}