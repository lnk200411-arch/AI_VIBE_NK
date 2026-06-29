import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AllFilesPage from './pages/AllFilesPage';
import MyFilesPage from './pages/MyFilesPage';
import SharedPage from './pages/SharedPage';
import RecentPage from './pages/RecentPage';
import FavoritesPage from './pages/FavoritesPage';
import TrashPage from './pages/TrashPage';
import UploadModal from './components/common/UploadModal';

function App() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setUploadOpen(false);
  }, []);

  const pageProps = { searchQuery, refreshKey };

  return (
    <BrowserRouter basename='/fileshare'>
      <AppLayout
        onUploadClick={() => { document.activeElement?.blur(); setUploadOpen(true); }}
        onSearch={setSearchQuery}
      >
        <Routes>
          <Route path='/' element={<AllFilesPage {...pageProps} />} />
          <Route path='/my-files' element={<MyFilesPage {...pageProps} />} />
          <Route path='/shared' element={<SharedPage {...pageProps} />} />
          <Route path='/recent' element={<RecentPage {...pageProps} />} />
          <Route path='/favorites' element={<FavoritesPage {...pageProps} />} />
          <Route path='/trash' element={<TrashPage {...pageProps} />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>

        <UploadModal
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          onSuccess={handleUploadSuccess}
        />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
