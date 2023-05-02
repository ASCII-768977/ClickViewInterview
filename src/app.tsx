import { Navigate, Route, Routes } from 'react-router-dom';

import {
  NotFound,
  Playlists,
  PlaylistVideos,
  Videos,
  Home,
  VideoDetails,
} from './routes';
import Layout from './components/layout';
import { Provider } from './context';

export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="" element={<Navigate to="/playlists" replace />} />
          <Route path="playlists">
            <Route index element={<Playlists />} />
            <Route path=":playlistId" element={<PlaylistVideos />} />
            <Route path=":playlistId/:videoId" element={<VideoDetails />} />
          </Route>
          <Route path="videos">
            <Route index element={<Videos />} />
            <Route path=":id" element={<VideoDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  );
}
