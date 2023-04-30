import { Navigate, Route, Routes } from 'react-router-dom';

import { NotFound, Playlists, PlaylistVideos, Videos } from './routes';
import Layout from './components/layout';
import { Provider } from './context';

export default function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Navigate to="/playlists" replace />} />
          <Route path="playlists">
            <Route index element={<Playlists />} />
            <Route path=":id" element={<PlaylistVideos />} />
          </Route>
          <Route path="videos" element={<Videos />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Provider>
  );
}
