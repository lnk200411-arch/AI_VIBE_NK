import { useState, useEffect, useCallback } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import CollectionsIcon from '@mui/icons-material/Collections';
import FileUpload from '../components/ui/FileUpload';
import ImageGallery from '../components/ui/ImageGallery';
import { supabase } from '../lib/supabase';

function DashboardPage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [preview, setPreview] = useState(null);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from('gallery').list('', {
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error) {
      showSnackbar('이미지 목록을 불러오지 못했습니다.', 'error');
      setIsLoading(false);
      return;
    }

    const imageList = (data || [])
      .filter((f) => f.name !== '.emptyFolderPlaceholder')
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from('gallery').getPublicUrl(f.name).data.publicUrl,
      }));

    setImages(imageList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleUploadSuccess = () => {
    showSnackbar('업로드 완료!', 'success');
    fetchImages();
  };

  const handleUploadError = (msg) => {
    showSnackbar(msg || '업로드 실패', 'error');
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'grey.100' }}>
      {/* 헤더 */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 3, px: 3 }}>
        <Container maxWidth='lg'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <CollectionsIcon sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Image Gallery
              </Typography>
              <Typography variant='body2' sx={{ opacity: 0.85 }}>
                이미지를 업로드하고 갤러리에서 확인하세요
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* 본문 */}
      <Container maxWidth='lg' sx={{ py: { xs: 3, md: 5 } }}>
        {/* 업로드 영역 */}
        <Typography variant='h6' fontWeight={600} mb={2}>
          업로드
        </Typography>
        <FileUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
        />

        <Divider sx={{ my: { xs: 3, md: 5 } }} />

        {/* 갤러리 영역 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant='h6' fontWeight={600}>
            갤러리
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {images.length}개 이미지
          </Typography>
        </Box>
        <ImageGallery
          images={images}
          isLoading={isLoading}
          onPreview={setPreview}
        />
      </Container>

      {/* 미리보기 Modal */}
      <Modal open={!!preview} onClose={() => setPreview(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <IconButton
            onClick={() => setPreview(null)}
            sx={{
              position: 'absolute',
              top: -16,
              right: -16,
              bgcolor: 'white',
              boxShadow: 3,
              '&:hover': { bgcolor: 'grey.100' },
            }}
          >
            <CloseIcon />
          </IconButton>
          {preview && (
            <Box
              component='img'
              src={preview.url}
              alt={preview.name}
              sx={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                borderRadius: 2,
                display: 'block',
                boxShadow: 10,
              }}
            />
          )}
        </Box>
      </Modal>

      {/* 알림 Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default DashboardPage;
