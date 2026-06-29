import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CollectionsIcon from '@mui/icons-material/Collections';
import FileUpload from '../components/ui/FileUpload';
import ImageGallery from '../components/ui/ImageGallery';

function DashboardPage() {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        bgcolor: 'grey.50',
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth='xl'>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          <CollectionsIcon sx={{ fontSize: 36, color: 'primary.main' }} />
          <Box>
            <Typography variant='h4' fontWeight={700} color='text.primary'>
              이미지 갤러리
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              이미지를 업로드하고 공유하세요
            </Typography>
          </Box>
        </Box>

        <FileUpload onUploadSuccess={handleUploadSuccess} />

        <Divider sx={{ my: 4 }} />

        <Typography variant='h6' fontWeight={600} color='text.primary' sx={{ mb: 2 }}>
          업로드된 이미지
        </Typography>

        <ImageGallery refreshKey={refreshKey} />
      </Container>
    </Box>
  );
}

export default DashboardPage;
