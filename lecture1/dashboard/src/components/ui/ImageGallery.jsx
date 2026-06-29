import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ImageIcon from '@mui/icons-material/Image';
import ImageCard from './ImageCard';

/**
 * ImageGallery 컴포넌트
 *
 * Props:
 * @param {Array} images - 이미지 목록 [{ name, url }] [Required]
 * @param {boolean} isLoading - 로딩 상태 [Optional, 기본값: false]
 * @param {function} onPreview - 이미지 미리보기 콜백 [Optional]
 *
 * Example usage:
 * <ImageGallery images={images} isLoading={false} onPreview={handlePreview} />
 */
function ImageGallery({ images, isLoading = false, onPreview }) {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 10,
          gap: 2,
          color: 'text.disabled',
        }}
      >
        <ImageIcon sx={{ fontSize: 64 }} />
        <Typography variant='body1'>업로드된 이미지가 없습니다.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {images.map((image) => (
        <Grid key={image.name} size={{ xs: 12, sm: 6, md: 4 }}>
          <ImageCard name={image.name} url={image.url} onPreview={onPreview} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageGallery;
