import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import LoadingScreen from './components/landing/LoadingScreen';
import ProfileSection from './components/landing/ProfileSection';
import WorksSection from './components/landing/WorksSection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingFinish = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      <Box
        sx={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        <ProfileSection />
        <WorksSection />
      </Box>
    </Box>
  );
}

export default App;
